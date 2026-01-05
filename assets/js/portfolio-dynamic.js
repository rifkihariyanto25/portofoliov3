// Portfolio Dynamic Handler
class PortfolioManager {
    constructor() {
        this.supabase = window.supabaseClient;
        this.projectGrid = document.getElementById('project-grid');
        this.currentFilter = 'all';
    }

    // Fetch portfolio dari Supabase
    async fetchProjects(category = 'all') {
        try {
            let query = this.supabase
                .from('portfolios')
                .select('*');

            // Filter berdasarkan kategori (support multiple categories)
            if (category !== 'all') {
                query = query.or(`category.cs.{${category}},category.ilike.%${category}%`);
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching projects:', error);
                return [];
            }

            // Sort by date (oldest first) - dari yang terlama ke terbaru
            data.sort((a, b) => new Date(a.date) - new Date(b.date));

            return data;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    // Render project card
    renderProjectCard(project, delay = 100) {
        const categories = project.category ? project.category.split(',').map(cat => cat.trim()) : [];
        const techIcon = project.icon || 'fa-code';
        
        const categoryColors = {
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
        
        const categoryLabels = {
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
                            const colorClass = categoryColors[cat] || 'from-slate-500/20 to-gray-500/20 border-slate-500/30 text-slate-400';
                            const label = categoryLabels[cat] || cat;
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

    // Load dan render projects
    async loadProjects(category = 'all') {
        if (!this.projectGrid) return;

        // Tampilkan loading
        this.projectGrid.innerHTML = '<div class="col-span-full text-center text-text-gray">Memuat portfolio...</div>';

        const projects = await this.fetchProjects(category);

        if (projects.length === 0) {
            this.projectGrid.innerHTML = '<div class="col-span-full text-center text-text-gray">Belum ada portfolio untuk kategori ini.</div>';
            return;
        }

        // Render projects
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
            btn.addEventListener('click', async (e) => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                // Get filter value
                const filter = e.target.getAttribute('data-filter');
                this.currentFilter = filter;

                // Load projects dengan filter
                await this.loadProjects(filter);
            });
        });
    }

    // Initialize
    async init() {
        await this.loadProjects('all');
        this.setupFilters();
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
