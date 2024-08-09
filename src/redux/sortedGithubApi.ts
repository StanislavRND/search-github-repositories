import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Repository } from '../types';

export const sortedGithubApi = createApi({
  reducerPath: 'sortedGithubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    sortRepositories: builder.query<{ items: Repository[] }, { repoName: string; sortBy: string }>({
      query: ({ repoName, sortBy }) => {
        const sortParam = sortBy === 'stars' ? 'stars' : sortBy === 'forks' ? 'forks' : 'updated';
        return `search/repositories?q=${repoName}+in:name${
          sortBy ? `&sort=${sortParam}&order=desc` : ''
        }`;
      },
      transformResponse: (response: any) => ({
        items: response.items.map((repo: Repository) => ({
          id: repo.id,
          name: repo.name,
          language: repo.language,
          forks_count: repo.forks_count,
          stargazers_count: repo.stargazers_count,
          updated_at: repo.updated_at,
          description: repo.description,
          license: repo.license,
        })),
      }),
    }),
  }),
});

export const { useSortRepositoriesQuery } = sortedGithubApi;
