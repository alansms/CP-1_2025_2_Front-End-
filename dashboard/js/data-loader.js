// Data Loader for CP1 Dashboard
class DataLoader {
    constructor() {
        this.baseUrl = 'https://raw.githubusercontent.com/alansms/CP-1_2025_2_Front-End-/main/arquivos_externos/';
        this.data = {
            movies: null,
            clusters: null,
            comparison: null
        };
    }

    async loadData() {
        try {
            console.log('Loading data from GitHub...');
            
            // Load movies data
            const moviesResponse = await fetch(`${this.baseUrl}imdb_top250_with_clusters.csv`);
            const moviesText = await moviesResponse.text();
            this.data.movies = this.parseCSV(moviesText);
            
            // Load cluster summary
            const clustersResponse = await fetch(`${this.baseUrl}cluster_summary.csv`);
            const clustersText = await clustersResponse.text();
            this.data.clusters = this.parseCSV(clustersText);
            
            // Load model comparison
            const comparisonResponse = await fetch(`${this.baseUrl}model_comparison_summary.csv`);
            const comparisonText = await comparisonResponse.text();
            this.data.comparison = this.parseCSV(comparisonText);
            
            console.log('Data loaded successfully:', this.data);
            return this.data;
            
        } catch (error) {
            console.error('Error loading data:', error);
            // Fallback to static data
            return this.getStaticData();
        }
    }

    parseCSV(text) {
        const lines = text.split('\n');
        const headers = lines[0].split(';');
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(';');
                const row = {};
                headers.forEach((header, index) => {
                    row[header.trim()] = values[index] ? values[index].trim() : '';
                });
                data.push(row);
            }
        }
        
        return data;
    }

    getStaticData() {
        return {
            movies: [
                {
                    title_en: "The Shawshank Redemption",
                    title_pt: "Um Sonho de Liberdade",
                    year: "1994",
                    rating: "9.3",
                    genre: "Epic",
                    cluster: "1"
                },
                {
                    title_en: "The Godfather",
                    title_pt: "O Poderoso Chefão",
                    year: "1972",
                    rating: "9.2",
                    genre: "Epic",
                    cluster: "3"
                }
                // Add more static data as needed
            ],
            clusters: [
                {
                    cluster: "0",
                    Num_Filmes: "5",
                    Genero_Principal: "Action Epic",
                    Rating_Medio: "8.88",
                    Ano_Medio: "1996"
                },
                {
                    cluster: "1",
                    Num_Filmes: "6",
                    Genero_Principal: "Epic",
                    Rating_Medio: "8.82",
                    Ano_Medio: "1986"
                }
                // Add more cluster data
            ],
            comparison: [
                {
                    Modelo: "Modelo 1 (TF-IDF)",
                    "Silhouette Score": "0.037",
                    "Calinski-Harabasz Score": "1.612",
                    "Davies-Bouldin Score": "2.450"
                },
                {
                    Modelo: "Modelo 2 (Todas Features)",
                    "Silhouette Score": "0.319",
                    "Calinski-Harabasz Score": "24.536",
                    "Davies-Bouldin Score": "0.934"
                }
            ]
        };
    }

    getClusterData(clusterId) {
        if (!this.data.movies) return [];
        return this.data.movies.filter(movie => movie.cluster === clusterId.toString());
    }

    getClusterStats() {
        if (!this.data.clusters) return {};
        
        const stats = {};
        this.data.clusters.forEach(cluster => {
            stats[cluster.cluster] = {
                count: parseInt(cluster.Num_Filmes),
                avgRating: parseFloat(cluster.Rating_Medio),
                avgYear: parseInt(cluster.Ano_Medio),
                mainGenre: cluster.Genero_Principal
            };
        });
        
        return stats;
    }

    getTopMoviesByCluster(clusterId, limit = 3) {
        const clusterMovies = this.getClusterData(clusterId);
        return clusterMovies
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .slice(0, limit);
    }

    getModelComparison() {
        return this.data.comparison || [];
    }
}

// Export for use in other scripts
window.DataLoader = DataLoader;
