import { getUserLists } from "@/services/userListsServices";
import ListsCard from "@/components/layout/ListsWrapper/ListsCard";
import s from "./styles.module.scss"
import ListsActions from "@/components/layout/ListsWrapper/LIstsActions";
import ListEditButton from "@/components/layout/ListsWrapper/ListEditButton";

interface ListProps {
    userId: string;
    username: string;
}

export default async function ListsWrapper({ userId, username }: ListProps) {
    const lists = await getUserLists(userId)

    return (
        <section className={s.listsWrapper}>
            {lists && lists.length > 0
                ? lists.map(list => (
                    <div key={list.id} className={s.listItem}>
                        <ListsCard {...list} />
                        <ListEditButton listId={list.id} listName={list.name} />
                    </div>
                ))
                : <p>{username} não tem nenhuma lista até o momento</p>}
            <ListsActions />
        </section>
    )
}