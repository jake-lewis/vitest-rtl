import { FC } from 'react';
import { BounceLoader } from 'react-spinners';
import { useGetPokemonByNameQuery } from '../../services/pokemon';

interface Props {
    name: string;
}

const PokemonTile:FC<Props> = ({ name }) => {
    const { data, isLoading, error } = useGetPokemonByNameQuery(name);

    if (error) {
        return (
            <p aria-label={'error message'}>Oh no, there was an error</p>
        );
    }

    if (isLoading) {
        return (
            <BounceLoader />
        );
    }

    if (data) {
        const pascalName = data.name.charAt(0).toUpperCase() + data.name.substring(1);
        return (
            <figure>
                <img src={data.sprites.front_default ?? undefined} alt={pascalName} />
                <figcaption>No. {data.id}: {pascalName}</figcaption>
            </figure>
        );
    }

    return null;
};

export default PokemonTile;
