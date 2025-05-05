if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js');
    });
}

function generateProposal() {
    alert('📄 Generating Proposal... (AI-based system placeholder)');
    // Here you'd integrate an actual AI system or API
}

document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`📧 Proposal will be sent to: ${email} (Mail API integration placeholder)`);
});