import styled from '@emotion/styled';
import { FC } from 'react';
import PokemonTile from './PokemonTile';

const Container = styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
});

export interface Props {
    names: string[];
}

const PokemonList: FC<Props> = ({ names }) => (
    <Container>
        {names.map((name) => <PokemonTile key={name} name={name} />)}
    </Container>
);

export default PokemonList;
