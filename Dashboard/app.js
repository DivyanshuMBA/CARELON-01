// Dashboard data
const dashboardData = {
    "title": "Carelon AI Trust Dashboard - US Healthcare Implementation",
    "metrics": [
        {"name": "Member Trust Score", "current": 82, "target": 80, "unit": "%", "status": "good"},
        {"name": "AI Transparency Index", "current": 78, "target": 95, "unit": "%", "status": "warning"},
        {"name": "HIPAA Compliance Rate", "current": 99.8, "target": 100, "unit": "%", "status": "good"},
        {"name": "Bias Detection Accuracy", "current": 94, "target": 95, "unit": "%", "status": "warning"},
        {"name": "Provider Satisfaction", "current": 87, "target": 85, "unit": "%", "status": "good"},
        {"name": "Regulatory Compliance", "current": 98, "target": 100, "unit": "%", "status": "warning"}
    ],
    "transparency_features": [
        {"icon": "📊", "title": "Real-time Trust & Bias Scores", "description": "Live monitoring of AI fairness metrics"},
        {"icon": "🔍", "title": "AI Decision Explainability", "description": "Clear explanations for all AI recommendations"},
        {"icon": "✅", "title": "Compliance & Audit Trail Access", "description": "Full transparency in decision tracking"}
    ],
    "project_status": [
        {
            "category": "Regulatory Foundation",
            "color": "#4C63D2",
            "items": [
                {"kpi": "Ethics Committee Formation", "current": 85, "target": 100, "status": "warning"},
                {"kpi": "CMS/FDA Compliance", "current": 92, "target": 100, "status": "warning"},
                {"kpi": "HIPAA Protocol Design", "current": 98, "target": 100, "status": "good"},
                {"kpi": "Medical Liability Framework", "current": 75, "target": 100, "status": "warning"},
                {"kpi": "State Approvals", "current": 40, "target": 100, "status": "critical"}
            ]
        },
        {
            "category": "Market Implementation", 
            "color": "#059669",
            "items": [
                {"kpi": "Medicare Advantage Pilots", "current": 15, "target": 80, "status": "critical"},
                {"kpi": "Provider Network Training", "current": 45, "target": 70, "status": "warning"},
                {"kpi": "EHR Integration Progress", "current": 78, "target": 95, "status": "warning"},
                {"kpi": "HEDIS Measures Integration", "current": 25, "target": 90, "status": "critical"},
                {"kpi": "Star Ratings Optimization", "current": 35, "target": 85, "status": "critical"}
            ]
        },
        {
            "category": "Engineering Development",
            "color": "#D97706", 
            "items": [
                {"kpi": "Transparency Dashboard", "current": 85, "target": 100, "status": "warning"},
                {"kpi": "Bias Detection Testing", "current": 90, "target": 95, "status": "warning"},
                {"kpi": "Member Feedback System", "current": 65, "target": 90, "status": "warning"},
                {"kpi": "Regulatory Audit Trail", "current": 75, "target": 100, "status": "warning"}
            ]
        },
        {
            "category": "Validation & Deployment",
            "color": "#7C3AED",
            "items": [
                {"kpi": "Success Metrics Validation", "current": 20, "target": 100, "status": "critical"},
                {"kpi": "Training Material Development", "current": 30, "target": 100, "status": "critical"},
                {"kpi": "End-to-End Testing", "current": 10, "target": 100, "status": "critical"},
                {"kpi": "Production Deployment", "current": 5, "target": 100, "status": "critical"}
            ]
        }
    ],
    "milestones": [
        {"name": "Alpha Release", "date": "Dec 2025", "status": "on_track"},
        {"name": "Beta Release", "date": "Jun 2026", "status": "at_risk"},
        {"name": "Production Release", "date": "Dec 2026", "status": "planning"}
    ]
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateTimestamp();
    setInterval(updateTimestamp, 1000); // Update every second
});

function initializeDashboard() {
    populateMetrics();
    populateProjectStatus();
    populateMilestones();
    setupEventListeners();
}

function updateTimestamp() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    document.getElementById('currentTime').textContent = now.toLocaleDateString('en-US', options);
}

function populateMetrics() {
    const metricsGrid = document.getElementById('metricsGrid');
    metricsGrid.innerHTML = '';

    dashboardData.metrics.forEach(metric => {
        const progressPercentage = Math.min((metric.current / metric.target) * 100, 100);
        
        const metricCard = document.createElement('div');
        metricCard.className = 'metric-card';
        metricCard.dataset.metric = metric.name;
        
        metricCard.innerHTML = `
            <div class="metric-header">
                <div class="metric-name">${metric.name}</div>
                <div class="metric-status ${metric.status}">
                    ${getStatusText(metric.status)}
                </div>
            </div>
            <div class="metric-value">${metric.current}${metric.unit}</div>
            <div class="metric-target">Target: ${metric.target}${metric.unit}</div>
            <div class="metric-progress">
                <div class="metric-progress-bar ${metric.status}" style="width: ${progressPercentage}%"></div>
            </div>
        `;
        
        metricsGrid.appendChild(metricCard);
    });
}

function populateProjectStatus() {
    const tableBody = document.getElementById('statusTableBody');
    tableBody.innerHTML = '';

    dashboardData.project_status.forEach(category => {
        category.items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.dataset.category = category.category;
            
            const progressPercentage = Math.min((item.current / item.target) * 100, 100);
            const categoryClass = getCategoryClass(category.category);
            
            row.innerHTML = `
                <td class="category-cell ${categoryClass}">
                    ${index === 0 ? category.category : ''}
                </td>
                <td>${item.kpi}</td>
                <td>${item.current}%</td>
                <td>${item.target}%</td>
                <td class="progress-cell">
                    <div class="progress-bar">
                        <div class="progress-fill ${item.status}" style="width: ${progressPercentage}%; background-color: ${getStatusColor(item.status)}">
                        </div>
                        <div class="progress-text">${item.current}%</div>
                    </div>
                </td>
                <td class="status-icon">${getStatusIcon(item.status)}</td>
            `;
            
            tableBody.appendChild(row);
        });
    });
}

function populateMilestones() {
    const milestonesTimeline = document.getElementById('milestonesTimeline');
    milestonesTimeline.innerHTML = '';

    dashboardData.milestones.forEach(milestone => {
        const milestoneItem = document.createElement('div');
        milestoneItem.className = 'milestone-item';
        
        milestoneItem.innerHTML = `
            <div class="milestone-name">${milestone.name}</div>
            <div class="milestone-date">${milestone.date}</div>
            <div class="milestone-status ${milestone.status}">${getStatusText(milestone.status)}</div>
        `;
        
        milestonesTimeline.appendChild(milestoneItem);
    });
}

function setupEventListeners() {
    // Metric card click handlers
    document.querySelectorAll('.metric-card').forEach(card => {
        card.addEventListener('click', function() {
            const metricName = this.dataset.metric;
            showMetricDetails(metricName);
        });
    });

    // Feature item click handlers
    document.querySelectorAll('.feature-item').forEach(item => {
        item.addEventListener('click', function() {
            const feature = this.dataset.feature;
            showFeatureDetails(feature);
        });
    });

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.addEventListener('change', function() {
        filterProjectStatus(this.value);
    });

    // Modal close handlers
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('detailModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function showMetricDetails(metricName) {
    const metric = dashboardData.metrics.find(m => m.name === metricName);
    if (!metric) return;

    const modal = document.getElementById('detailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = metric.name + ' Details';
    
    const progressPercentage = Math.min((metric.current / metric.target) * 100, 100);
    const variance = metric.current - metric.target;
    const varianceText = variance >= 0 ? `+${variance}%` : `${variance}%`;
    const varianceClass = variance >= 0 ? 'good' : 'warning';

    modalBody.innerHTML = `
        <div class="metric-detail">
            <div class="detail-row">
                <strong>Current Value:</strong> ${metric.current}${metric.unit}
            </div>
            <div class="detail-row">
                <strong>Target Value:</strong> ${metric.target}${metric.unit}
            </div>
            <div class="detail-row">
                <strong>Variance from Target:</strong> 
                <span class="status ${varianceClass}">${varianceText}</span>
            </div>
            <div class="detail-row">
                <strong>Status:</strong> 
                <span class="status ${metric.status}">${getStatusText(metric.status)}</span>
            </div>
            <div class="detail-row">
                <strong>Progress:</strong> ${progressPercentage.toFixed(1)}%
            </div>
            <div style="margin-top: 16px;">
                <div class="metric-progress">
                    <div class="metric-progress-bar ${metric.status}" style="width: ${progressPercentage}%"></div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function showFeatureDetails(feature) {
    const featureData = dashboardData.transparency_features.find(f => 
        f.title.toLowerCase().includes(feature.replace('-', ' '))
    );
    if (!featureData) return;

    const modal = document.getElementById('detailModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    modalTitle.textContent = featureData.title;
    
    modalBody.innerHTML = `
        <div class="feature-detail">
            <div class="feature-icon-large" style="font-size: 48px; text-align: center; margin-bottom: 16px;">
                ${featureData.icon}
            </div>
            <p style="font-size: 16px; margin-bottom: 16px;">
                ${featureData.description}
            </p>
            <div class="feature-benefits">
                <h4>Key Benefits:</h4>
                <ul>
                    <li>Enhanced transparency in AI decision-making</li>
                    <li>Improved regulatory compliance</li>
                    <li>Better patient and provider trust</li>
                    <li>Real-time monitoring capabilities</li>
                </ul>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function filterProjectStatus(category) {
    const rows = document.querySelectorAll('#statusTableBody tr');
    
    rows.forEach(row => {
        if (category === 'all' || row.dataset.category === category) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function closeModal() {
    document.getElementById('detailModal').classList.add('hidden');
}

function getStatusText(status) {
    const statusMap = {
        'good': 'On Track',
        'warning': 'At Risk',
        'critical': 'Critical',
        'on_track': 'On Track',
        'at_risk': 'At Risk',
        'planning': 'Planning'
    };
    return statusMap[status] || status;
}

function getStatusIcon(status) {
    const iconMap = {
        'good': '✅',
        'warning': '⚠️',
        'critical': '❌'
    };
    return iconMap[status] || '❓';
}

function getStatusColor(status) {
    const colorMap = {
        'good': '#059669',
        'warning': '#D97706',
        'critical': '#DC2626'
    };
    return colorMap[status] || '#6B7280';
}

function getCategoryClass(category) {
    const classMap = {
        'Regulatory Foundation': 'category-regulatory',
        'Market Implementation': 'category-market',
        'Engineering Development': 'category-engineering',
        'Validation & Deployment': 'category-validation'
    };
    return classMap[category] || '';
}

// Simulate real-time updates (optional enhancement)
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Randomly update some metrics slightly
        dashboardData.metrics.forEach(metric => {
            if (Math.random() < 0.1) { // 10% chance to update
                const variance = (Math.random() - 0.5) * 2; // ±1% variance
                metric.current = Math.max(0, Math.min(100, metric.current + variance));
            }
        });
        
        // Re-populate metrics to show updates
        populateMetrics();
        setupEventListeners(); // Re-attach event listeners
    }, 30000); // Update every 30 seconds
}

