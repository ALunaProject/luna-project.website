// Recorte de imagem (foto de perfil e banner) feito no navegador, antes de enviar pro back.

export interface PixelCrop {
    x: number
    y: number
    width: number
    height: number
}

export interface CropPreset {
    aspect: number // largura / altura da área recortada
    maxWidth: number // largura máxima do arquivo final (px) — imagens maiores são reduzidas
    fileName: string
}

export const AVATAR_CROP: CropPreset = { aspect: 1, maxWidth: 512, fileName: "avatar" }
// 16:5 ≈ proporção do <Banner> (altura 400px) numa tela desktop
export const BANNER_CROP: CropPreset = { aspect: 16 / 5, maxWidth: 1920, fileName: "banner" }

// limite de tamanho do back (ImageUploadService): 2MB
const MAX_OUTPUT_BYTES = 2 * 1024 * 1024
// cor de fundo usada quando um PNG transparente precisa virar JPEG
const FLATTEN_BACKGROUND = "#160f1d"

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error("image-load-failed"))
        img.src = src
    })
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
    return new Promise<Blob | null>(resolve => canvas.toBlob(resolve, type, quality))
}

// JPEG não tem transparência: pinta um fundo antes (senão o transparente vira preto)
function flatten(source: HTMLCanvasElement) {
    const canvas = document.createElement("canvas")
    canvas.width = source.width
    canvas.height = source.height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("canvas-unavailable")
    ctx.fillStyle = FLATTEN_BACKGROUND
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(source, 0, 0)
    return canvas
}

interface Attempt {
    type: "image/png" | "image/jpeg"
    quality?: number
    flatten: boolean
}

// Recorta `imageSrc` na área escolhida e devolve um File JPG/PNG de até 2MB.
// PNG continua PNG (mantém transparência) se couber; senão cai pra JPEG com qualidade menor.
export async function cropImageToFile(
    imageSrc: string,
    area: PixelCrop,
    preset: CropPreset,
    sourceType: string,
): Promise<File> {
    const img = await loadImage(imageSrc)

    const scale = Math.min(1, preset.maxWidth / area.width)
    const width = Math.max(1, Math.round(area.width * scale))
    const height = Math.max(1, Math.round(area.height * scale))

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("canvas-unavailable")
    ctx.imageSmoothingQuality = "high"
    ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, width, height)

    const attempts: Attempt[] =
        sourceType === "image/png"
            ? [
                { type: "image/png", flatten: false },
                { type: "image/jpeg", quality: 0.9, flatten: true },
                { type: "image/jpeg", quality: 0.75, flatten: true },
            ]
            : [
                { type: "image/jpeg", quality: 0.92, flatten: false },
                { type: "image/jpeg", quality: 0.8, flatten: false },
                { type: "image/jpeg", quality: 0.65, flatten: false },
            ]

    for (const attempt of attempts) {
        const target = attempt.flatten ? flatten(canvas) : canvas
        const blob = await toBlob(target, attempt.type, attempt.quality)
        if (blob && blob.size <= MAX_OUTPUT_BYTES) {
            const ext = attempt.type === "image/png" ? "png" : "jpg"
            return new File([blob], `${preset.fileName}.${ext}`, { type: attempt.type })
        }
    }

    throw new Error("image-too-large")
}