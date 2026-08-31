interface TagsProps {
    label: string;
}

export default function Tags({label}: TagsProps) {
    return (
        <span>
            {label}
        </span>
    )
}