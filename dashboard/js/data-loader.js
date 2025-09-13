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

// Função global para carregar dados
async function loadData() {
    const dataLoader = new DataLoader();
    const data = await dataLoader.loadData();
    
    // Criar gráficos
    createClusterChart(data);
    createModelChart(data);
    displayClusterDetails(data);
    
    // Armazenar dados globalmente para filtros
    window.dashboardData = data;
    window.dataLoader = dataLoader;
}

// Função para criar gráfico de clusters
function createClusterChart(data) {
    const ctx = document.getElementById('clusterChart').getContext('2d');
    
    if (data.clusters) {
        const clusterStats = window.dataLoader.getClusterStats();
        const labels = Object.keys(clusterStats).map(id => `Cluster ${id}`);
        const counts = Object.values(clusterStats).map(stat => stat.count);
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: counts,
                    backgroundColor: [
                        '#2563eb',
                        '#0ea5e9',
                        '#059669',
                        '#d97706',
                        '#dc2626'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Função para criar gráfico de comparação de modelos
function createModelChart(data) {
    const ctx = document.getElementById('modelChart').getContext('2d');
    
    if (data.comparison) {
        const labels = data.comparison.map(model => model.Modelo);
        const silhouetteScores = data.comparison.map(model => parseFloat(model['Silhouette Score']));
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Silhouette Score',
                    data: silhouetteScores,
                    backgroundColor: ['#2563eb', '#64748b'],
                    borderColor: ['#1d4ed8', '#475569'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.5
                    }
                }
            }
        });
    }
}

// Função para exibir detalhes dos clusters
function displayClusterDetails(data) {
    const container = document.getElementById('cluster-details');
    
    if (data.clusters && window.dataLoader) {
        const clusterStats = window.dataLoader.getClusterStats();
        let html = '<div class="row">';
        
        Object.keys(clusterStats).forEach(clusterId => {
            const stats = clusterStats[clusterId];
            const topMovies = window.dataLoader.getTopMoviesByCluster(clusterId, 3);
            
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h6 class="card-title mb-0">
                                <span class="badge bg-primary me-2">Cluster ${clusterId}</span>
                                ${stats.count} filmes
                            </h6>
                        </div>
                        <div class="card-body">
                            <p class="text-muted mb-2">
                                <i class="fas fa-star me-1"></i>
                                Rating médio: ${stats.avgRating.toFixed(2)}
                            </p>
                            <p class="text-muted mb-2">
                                <i class="fas fa-calendar me-1"></i>
                                Ano médio: ${stats.avgYear}
                            </p>
                            <p class="text-muted mb-2">
                                <i class="fas fa-tags me-1"></i>
                                Gênero: ${stats.mainGenre}
                            </p>
                            <h6 class="mb-2">Top 3 filmes:</h6>
                            <ul class="list-unstyled">
                                ${topMovies.map(movie => `
                                    <li class="mb-1">
                                        <small>${movie.title_en} (${movie.rating})</small>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }
}

// Função para filtrar filmes com dados reais
function filterMoviesReal() {
    if (!window.dashboardData || !window.dashboardData.movies) {
        filterMovies(); // Fallback para dados mock
        return;
    }
    
    const cluster = document.getElementById('cluster-filter').value;
    const genre = document.getElementById('genre-filter').value;
    const rating = document.getElementById('rating-filter').value;
    const search = document.getElementById('search-filter').value.toLowerCase();
    
    let filteredMovies = window.dashboardData.movies;
    
    // Aplicar filtros
    if (cluster !== '') {
        filteredMovies = filteredMovies.filter(m => m.cluster === cluster);
    }
    
    if (genre !== '') {
        filteredMovies = filteredMovies.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()));
    }
    
    if (rating !== '') {
        filteredMovies = filteredMovies.filter(m => parseFloat(m.rating) >= parseFloat(rating));
    }
    
    if (search !== '') {
        filteredMovies = filteredMovies.filter(m => 
            m.title_en.toLowerCase().includes(search) || 
            m.title_pt.toLowerCase().includes(search)
        );
    }
    
    // Limitar a 20 resultados para performance
    filteredMovies = filteredMovies.slice(0, 20);
    
    const modal = new bootstrap.Modal(document.getElementById('movieModal'));
    modal.show();
    
    displayFilteredMovies(filteredMovies);
}

// Função para exibir filmes filtrados
function displayFilteredMovies(movies) {
    const container = document.getElementById('filtered-movies');
    container.innerHTML = '';
    
    if (movies.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Nenhum filme encontrado com os filtros aplicados.</p>';
        return;
    }
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-title">${movie.title_en}</div>
            <div class="movie-details">
                ${movie.year} • ${movie.genre} • Rating: ${movie.rating}
            </div>
            <span class="movie-cluster">Cluster ${movie.cluster}</span>
        `;
        container.appendChild(movieCard);
    });
}

// Export for use in other scripts
window.DataLoader = DataLoader;
