import { getUserLists } from "@/services/userListsServices";
import ListsCard from "@/components/shared/ListsCard/ListsCard";
import s from "@/app/[username]/styles.module.scss";

interface ListProps {
    userId: string;
    username: string;
}

export default async function ListsWrapper({userId, username}: ListProps) {
    // const [ lists, setLists ] = useState<ListsDTO[]>( [] );
    //
    // useEffect( () => {
    //     const token = localStorage.getItem( STORAGE_KEYS.TOKEN );
    //
    //     if (!token) return console.error( "No token" );
    //
    //     getUserLists( token ).then( ( data ) => {
    //         if (data) setLists( data );
    //     } );
    // }, [] );

    const lists = await getUserLists(userId)

    return (
        <section className={s.listsWrapper}>
            { lists && lists.length > 0
                ? lists.map( ( list ) => <ListsCard key={ list.id } { ...list } /> )
                : <p>{ username } não tem nenhuma lista até o momento</p> }
        </section>
    );
}