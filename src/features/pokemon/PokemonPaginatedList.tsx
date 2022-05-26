import { FC, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useGetPokemonQuery } from "../../services/pokemon";
import PaginationWrapper from "../common/PaginationWrapper";
import PokemonList from "./PokemonList";

interface Props {
    defaultPage?: number,
    defaultPageSize?: number,
}

const PokemonPaginatedList:FC<Props> = ({defaultPage = 1, defaultPageSize = 20}: Props) => {
    const [page, setPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    //! filter/order query params would go in here too
    const { data: pokemonNames, isLoading: namesIsLoading, error: namesError } 
        = useGetPokemonQuery({ limit: pageSize, offset: (page - 1) * pageSize });

    if (namesError) {
        return <p>ERROR</p>
    }

    if (namesIsLoading) {
        return (
            <PaginationWrapper page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize}>
                <SyncLoader />
            </PaginationWrapper>
        )
    }

    if (pokemonNames) {
        return (
            //! Filter component here, props passed in like pagination
            <PaginationWrapper 
                count={pokemonNames.count} 
                page={page} 
                setPage={setPage} 
                pageSize={pageSize} 
                setPageSize={setPageSize}>
                <PokemonList names={pokemonNames.results.map(result => result.name)}/>
            </PaginationWrapper>
        )
    }

    throw new Error('invalid state');
}

export default PokemonPaginatedList;