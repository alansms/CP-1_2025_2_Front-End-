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
            console.log('Carregando dados reais do GitHub...');
            
            // Load movies data
            console.log('Carregando dados dos filmes...');
            const moviesResponse = await fetch(`${this.baseUrl}imdb_top250_with_clusters.csv`);
            if (!moviesResponse.ok) {
                throw new Error(`Erro ao carregar filmes: ${moviesResponse.status}`);
            }
            const moviesText = await moviesResponse.text();
            this.data.movies = this.parseCSV(moviesText);
            console.log('Filmes carregados:', this.data.movies.length);
            
            // Load cluster summary
            console.log('Carregando resumo dos clusters...');
            const clustersResponse = await fetch(`${this.baseUrl}cluster_summary.csv`);
            if (!clustersResponse.ok) {
                throw new Error(`Erro ao carregar clusters: ${clustersResponse.status}`);
            }
            const clustersText = await clustersResponse.text();
            this.data.clusters = this.parseCSV(clustersText);
            console.log('Clusters carregados:', this.data.clusters.length);
            
            // Load model comparison
            console.log('Carregando comparação de modelos...');
            const comparisonResponse = await fetch(`${this.baseUrl}model_comparison_summary.csv`);
            if (!comparisonResponse.ok) {
                throw new Error(`Erro ao carregar comparação: ${comparisonResponse.status}`);
            }
            const comparisonText = await comparisonResponse.text();
            this.data.comparison = this.parseCSV(comparisonText);
            console.log('Comparação carregada:', this.data.comparison.length);
            
            console.log('Todos os dados reais carregados com sucesso!');
            return this.data;
            
        } catch (error) {
            console.error('Erro ao carregar dados reais:', error);
            throw error; // Re-throw para não usar dados simulados
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
    try {
        console.log('Iniciando carregamento dos dados reais...');
        const dataLoader = new DataLoader();
        const data = await dataLoader.loadData();
        
        console.log('Dados carregados:', data);
        
        // Verificar se os dados foram carregados corretamente
        if (!data || (!data.clusters && !data.movies && !data.comparison)) {
            throw new Error('Dados não foram carregados corretamente');
        }
        
        // Criar gráficos apenas com dados reais
        createClusterChart(data);
        createModelChart(data);
        displayClusterDetails(data);
        
        // Armazenar dados globalmente para filtros
        window.dashboardData = data;
        window.dataLoader = dataLoader;
        
        console.log('Dados reais carregados e exibidos com sucesso!');
        
    } catch (error) {
        console.error('Erro ao carregar dados reais:', error);
        // Mostrar mensagem de erro em vez de dados simulados
        showDataError();
    }
}

// Função para mostrar erro quando dados não carregam
function showDataError() {
    const clusterContainer = document.getElementById('cluster-details');
    const clusterChart = document.getElementById('clusterChart');
    const modelChart = document.getElementById('modelChart');
    
    if (clusterContainer) {
        clusterContainer.innerHTML = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">⚠️ Dados não disponíveis</h4>
                <p>Os dados dos clusters não puderam ser carregados. Verifique sua conexão com a internet e tente novamente.</p>
                <hr>
                <p class="mb-0">
                    <button class="btn btn-primary" onclick="loadData()">
                        <i class="fas fa-refresh me-1"></i>
                        Tentar Novamente
                    </button>
                </p>
            </div>
        `;
    }
    
    if (clusterChart) {
        clusterChart.innerHTML = `
            <div class="text-center p-4">
                <i class="fas fa-exclamation-triangle text-warning fa-3x mb-3"></i>
                <p class="text-muted">Gráfico não disponível</p>
            </div>
        `;
    }
    
    if (modelChart) {
        modelChart.innerHTML = `
            <div class="text-center p-4">
                <i class="fas fa-exclamation-triangle text-warning fa-3x mb-3"></i>
                <p class="text-muted">Gráfico não disponível</p>
            </div>
        `;
    }
}

// Função para criar gráfico de clusters
function createClusterChart(data) {
    const ctx = document.getElementById('clusterChart');
    if (!ctx) {
        console.error('Elemento clusterChart não encontrado');
        return;
    }
    
    // Destruir gráfico existente se houver
    if (window.clusterChartInstance) {
        window.clusterChartInstance.destroy();
    }
    
    if (data && data.clusters) {
        const labels = data.clusters.map(c => `Cluster ${c.cluster}`);
        const counts = data.clusters.map(c => parseInt(c.Num_Filmes));
        
        window.clusterChartInstance = new Chart(ctx, {
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
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        
        console.log('Gráfico de clusters criado com sucesso');
    } else {
        console.error('Dados de clusters não disponíveis');
    }
}

// Função para criar gráfico de comparação de modelos
function createModelChart(data) {
    const ctx = document.getElementById('modelChart');
    if (!ctx) {
        console.error('Elemento modelChart não encontrado');
        return;
    }
    
    // Destruir gráfico existente se houver
    if (window.modelChartInstance) {
        window.modelChartInstance.destroy();
    }
    
    if (data && data.comparison) {
        const labels = data.comparison.map(model => model.Modelo);
        const silhouetteScores = data.comparison.map(model => parseFloat(model['Silhouette Score']));
        
        window.modelChartInstance = new Chart(ctx, {
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
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 0.5
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        console.log('Gráfico de comparação criado com sucesso');
    } else {
        console.error('Dados de comparação não disponíveis');
    }
}

// Função para exibir detalhes dos clusters
function displayClusterDetails(data) {
    const container = document.getElementById('cluster-details');
    if (!container) {
        console.error('Elemento cluster-details não encontrado');
        return;
    }
    
    if (data && data.clusters) {
        let html = '<div class="row">';
        
        data.clusters.forEach(cluster => {
            const clusterMovies = data.movies ? data.movies.filter(m => m.cluster === cluster.cluster) : [];
            const topMovies = clusterMovies
                .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
                .slice(0, 3);
            
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100">
                        <div class="card-header">
                            <h6 class="card-title mb-0">
                                <span class="badge bg-primary me-2">Cluster ${cluster.cluster}</span>
                                ${cluster.Num_Filmes} filmes
                            </h6>
                        </div>
                        <div class="card-body">
                            <p class="text-muted mb-2">
                                <i class="fas fa-star me-1"></i>
                                Rating médio: ${parseFloat(cluster.Rating_Medio).toFixed(2)}
                            </p>
                            <p class="text-muted mb-2">
                                <i class="fas fa-calendar me-1"></i>
                                Ano médio: ${cluster.Ano_Medio}
                            </p>
                            <p class="text-muted mb-2">
                                <i class="fas fa-tags me-1"></i>
                                Gênero: ${cluster.Genero_Principal}
                            </p>
                            <h6 class="mb-2">Top 3 filmes:</h6>
                            <ul class="list-unstyled">
                                ${topMovies.length > 0 ? topMovies.map(movie => `
                                    <li class="mb-1">
                                        <small>${movie.title_en} (${movie.rating})</small>
                                    </li>
                                `).join('') : '<li class="mb-1"><small>Dados não disponíveis</small></li>'}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        console.log('Detalhes dos clusters exibidos com sucesso');
    } else {
        console.error('Dados de clusters não disponíveis para exibição');
        container.innerHTML = '<p class="text-muted text-center">Dados não disponíveis</p>';
    }
}

// Função para filtrar filmes com dados reais
function filterMoviesReal() {
    if (!window.dashboardData || !window.dashboardData.movies) {
        alert('Dados não disponíveis. Por favor, aguarde o carregamento dos dados reais.');
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
