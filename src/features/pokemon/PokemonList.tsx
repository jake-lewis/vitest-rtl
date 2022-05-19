import styled from '@emotion/styled';
import { FC } from 'react';
import { PropagateLoader } from 'react-spinners';
import { useGetPokemonQuery } from '../../services/pokemon';
import PokemonTile from './PokemonTile';

const Container = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
});

interface Props {
    page?: number;
    pageSize?: number;
    limit?: number;
}

const PokemonList: FC<Props> = ({ page = 1, pageSize = 20, limit = 20 }) => {
    const { data, isLoading } = useGetPokemonQuery({ limit, offset: (page - 1) * pageSize });

    if (isLoading) {
        return (
            <PropagateLoader />
        );
    }

    if (data) {
        return (
            <Container>
                {data.results.map((result) => <PokemonTile key={result.name} name={result.name} />)}
            </Container>
        );
    }

    return null;
};

export default PokemonList;
