import React from 'react';
import { wrapper } from '~/store';
import { swApi } from '~/store/api/apiSlice';
import { Home } from '~/pagesComponents';
import { CharacterNormilized } from '~/types';

export type HomePageProps = {
  initialData: {
    results: CharacterNormilized[];
    count: number;
  } | null;
};

const HomePage = ({ initialData }: HomePageProps) => (
  <Home data={initialData} />
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page = '1', search = '', characterId } = context.query;

    const { data } = await store.dispatch(
      swApi.endpoints.getCharacters.initiate({
        name: search as string,
        page: Number(page),
      })
    );

    let details = null;
    if (characterId && typeof characterId === 'string') {
      details =
        (await store.dispatch(
          swApi.endpoints.getDetails.initiate(characterId)
        )) ?? null;
    }
    return {
      props: {
        initialData:
          { results: data?.results, count: data?.count, details } || null,
      },
    };
  }
);

export default HomePage;
