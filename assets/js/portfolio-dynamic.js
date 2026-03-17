// Portfolio Dynamic Handler
class PortfolioManager {
    constructor() {
        this.supabase = window.supabaseClient;
        this.projectGrid = document.getElementById('project-grid');
        this.filterContainer = document.getElementById('filter-container');
        this.currentFilter = 'all';
        this.allProjects = [];
        // Detect halaman: jika ada filter-container = full page, jika tidak = featured (limit 3)
        this.isFullPage = !!this.filterContainer;
    }

    categoryLabels = {
        'backend': 'Backend',
        'frontend': 'Frontend',
        'fullstack': 'Full Stack',
        'mobile': 'Mobile',
        'devops': 'DevOps',
        'ml': 'ML/AI',
        'iot': 'IoT',
        'uiux': 'UI/UX',
        'pm': 'Project Manager'
    };

    categoryColors = {
        'backend': 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400',
        'frontend': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
        'fullstack': 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400',
        'mobile': 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400',
        'devops': 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400',
        'ml': 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
        'iot': 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30 text-indigo-400',
        'uiux': 'from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-400',
        'pm': 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-400'
    };

    // Fetch semua portfolio dari Supabase (sekali saja)
    async fetchAllProjects() {
        try {
            const { data, error } = await this.supabase
                .from('portfolios')
                .select('*');

            if (error) {
                console.error('Error fetching projects:', error);
                return [];
            }

            // Sort by date (newest first) - dari yang terbaru ke terlama
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            return data;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    // Filter projects client-side berdasarkan kategori
    filterProjects(category = 'all') {
        if (category === 'all') return this.allProjects;

        return this.allProjects.filter(project => {
            if (!project.category) return false;
            const cats = project.category.split(',').map(c => c.trim());
            return cats.includes(category);
        });
    }

    // Extract unique categories dari semua projects
    extractCategories(projects) {
        const categorySet = new Set();
        projects.forEach(project => {
            if (project.category) {
                project.category.split(',').forEach(cat => categorySet.add(cat.trim()));
            }
        });
        return Array.from(categorySet);
    }

    // Render filter buttons dari categories yang ada di database
    renderFilterButtons(categories) {
        if (!this.filterContainer) return;

        const btnClass = 'filter-btn px-6 py-2.5 rounded-full border-2 border-slate-300 text-slate-900 font-medium transition duration-300 hover:border-accent-purple';

        let html = `<button data-filter="all" class="${btnClass} active">All Projects</button>`;

        categories.forEach(cat => {
            const label = this.categoryLabels[cat] || cat;
            html += `<button data-filter="${cat}" class="${btnClass}">${label}</button>`;
        });

        this.filterContainer.innerHTML = html;
    }

    // Render project card
    renderProjectCard(project, delay = 100) {
        const categories = project.category ? project.category.split(',').map(cat => cat.trim()) : [];
        const techIcon = project.icon || 'fa-code';

        return `
            <div class="project-card project-item ${categories.join(' ')} all gradient-border hover-lift"
                 data-aos="fade-up"
                 data-aos-delay="${delay}"
                 data-category="${project.category}">
                <div class="p-8 relative z-10 h-full flex flex-col">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center">
                            <i class="fas ${techIcon} text-accent-purple text-2xl"></i>
                        </div>
                        <span class="text-xs text-slate-500 mt-1">${this.formatDate(project.date)}</span>
                    </div>

                    <h3 class="text-2xl font-bold text-slate-900 mb-3">${project.title}</h3>
                    <p class="text-slate-600 mb-6 flex-grow leading-relaxed">
                        ${project.description}
                    </p>

                    <div class="flex flex-wrap gap-2">
                        ${categories.map(cat => {
                            const colorClass = this.categoryColors[cat] || 'from-slate-500/20 to-gray-500/20 border-slate-500/30 text-slate-400';
                            const label = this.categoryLabels[cat] || cat;
                            return `<span class="px-3 py-1 text-xs rounded-lg bg-gradient-to-r ${colorClass} border font-medium">${label}</span>`;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Format tanggal
    formatDate(dateString) {
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const date = new Date(dateString);
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    // Render projects ke grid
    renderProjects(category = 'all') {
        if (!this.projectGrid) return;

        let projects = this.filterProjects(category);

        if (projects.length === 0) {
            this.projectGrid.innerHTML = '<div class="col-span-full text-center text-text-gray">Belum ada portfolio untuk kategori ini.</div>';
            return;
        }

        // Limit ke 3 project terbaru jika bukan full page
        if (!this.isFullPage) {
            projects = projects.slice(0, 3);
        }

        this.projectGrid.innerHTML = projects.map((project, index) =>
            this.renderProjectCard(project, (index + 1) * 100)
        ).join('');

        // Reinitialize AOS untuk animasi
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    // Setup filter buttons
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Get filter value dan render ulang (client-side, tanpa API call)
                const filter = e.target.getAttribute('data-filter');
                this.currentFilter = filter;
                this.renderProjects(filter);
            });
        });
    }

    // Initialize
    async init() {
        if (!this.projectGrid) return;

        // Tampilkan loading
        this.projectGrid.innerHTML = '<div class="col-span-full text-center text-slate-600 py-12"><i class="fas fa-spinner fa-spin text-4xl mb-4"></i><p>Memuat portfolio...</p></div>';

        // Fetch semua projects sekali saja
        this.allProjects = await this.fetchAllProjects();

        if (this.allProjects.length === 0) {
            this.projectGrid.innerHTML = '<div class="col-span-full text-center text-text-gray">Belum ada portfolio.</div>';
            return;
        }

        if (this.isFullPage) {
            // Generate filter buttons dari categories yang ada di database
            const categories = this.extractCategories(this.allProjects);
            this.renderFilterButtons(categories);
        }

        // Render semua projects
        this.renderProjects('all');

        if (this.isFullPage) {
            this.setupFilters();
        }
    }
}

// Initialize ketika DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah Supabase client tersedia
    if (typeof window.supabaseClient === 'undefined') {
        console.error('Supabase client tidak ditemukan. Pastikan supabase-config.js sudah di-load.');
        return;
    }

    const portfolioManager = new PortfolioManager();
    portfolioManager.init();
});
