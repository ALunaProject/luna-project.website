"use client"

import { useEffect, useId, useState } from "react"
import s from "../styles.module.scss"
import { UseListModalProps } from "@/types/UserLIstsDTO";
import { useDialog } from "@/hooks/useDialog";
import { useListModal } from "@/hooks/useListModal";
import Button from "@/components/ui/Button/Button";

export default function ListModal(props: UseListModalProps) {
	const {open, onClose} = props
	const inputId = useId()
	const dialogRef = useDialog(open)

	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const {
		name,
		setName,
		loading,
		error,
		confirmingDelete,
		setConfirmingDelete,
		handleSubmit,
		handleDelete,
	} = useListModal(props)

	const isEdit = props.mode === "edit"

	if (!mounted) return null


	return (
		<dialog
			ref={dialogRef}
			className={s.dialog}
			onClose={onClose}
			onClick={(e) => {
				e.stopPropagation()
				if (e.target === e.currentTarget) onClose()
			}}
		>
			<div className={s.content}>
				<h2>{isEdit ? "Editar lista" : "Nova lista"}</h2>

				<form className={s.section} onSubmit={handleSubmit}>
					<label htmlFor={inputId}>Nome da lista</label>
					<input
						id={inputId}
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						maxLength={50}
						placeholder={isEdit ? undefined : "Ex: Quero jogar"}
						autoFocus
						disabled={loading}
					/>
					<div className={s.actions}>
						<Button label="Cancelar" type="button" onClick={onClose} disabled={loading}/>
						<Button
							label={loading && !confirmingDelete ? "Salvando..." : isEdit ? "Salvar nome" : "Criar lista"}
							type="submit"
							disabled={loading}/>
					</div>
				</form>

				{isEdit && (
					<div className={`${s.section} ${s.danger}`}>
						<h3>Zona de perigo</h3>

						{!confirmingDelete ? (
							<Button
								label="Deletar lista"
								type="button"
								className={s.deleteBtn}
								onClick={() => setConfirmingDelete(true)}
								disabled={loading}
							/>
						) : (
							<>
								<p>
									Deletar <strong>{props.listName}</strong>? Essa ação não pode ser desfeita.
								</p>
								<div className={s.actions}>
									<Button
										label="Voltar"
										type="button"
										onClick={() => setConfirmingDelete(false)}
										disabled={loading}
									/>
									<Button
										label={loading ? "Deletando..." : "Deletar"}
										type="button"
										className={s.deleteBtn}
										onClick={handleDelete}
										disabled={loading}
									/>
								</div>
							</>
						)}
					</div>
				)}

				{error && <p className={s.error} role="alert">{error}</p>}
			</div>
		</dialog>
	)
}