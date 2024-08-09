// Массив репозиториев
export interface ApiResponse {
	items: Repository[];
}

// Репозиторий гитхаба
export interface Repository {
	id: number;
	name: string;
	language: string;
	forks_count: number;
	stargazers_count: number;
	updated_at: string;
	description: string;
	license: { key: string; name: string; spdx_id: string; url: string; node_id: string } | null;
}
