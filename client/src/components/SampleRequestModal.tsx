import { useState, FormEvent } from 'react';

export default function SampleRequestModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  
  const hideModal = () => {
    const modal = document.getElementById('sample-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // This would be connected to backend in a real implementation
    console.log("Sample request submission:", { name, email, reason });
    // Reset form fields
    setName('');
    setEmail('');
    setReason('');
    // Hide modal
    hideModal();
    // Show success message (in a real implementation)
  };

  return (
    <div id="sample-modal" className="fixed inset-0 bg-neutral-dark/70 flex items-center justify-center z-50 hidden">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-forest">Sample Request</h3>
          <button 
            id="close-modal"
            onClick={hideModal}
            aria-label="Close sample request modal"
            className="text-neutral-dark/60 hover:text-neutral-dark"
          >
            <i className="fas fa-times text-xl" aria-hidden="true"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="modal-name" className="flex items-center text-sm font-semibold mb-2">
              <i className="fas fa-user text-forest mr-2" aria-hidden="true"></i>
              Full Name
            </label>
            <input 
              type="text" 
              id="modal-name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest bg-sage/5"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="modal-email" className="flex items-center text-sm font-semibold mb-2">
              <i className="fas fa-envelope text-forest mr-2" aria-hidden="true"></i>
              Email Address
            </label>
            <input 
              type="email" 
              id="modal-email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest bg-sage/5"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="modal-reason" className="flex items-center text-sm font-semibold mb-2">
              <i className="fas fa-clipboard-list text-forest mr-2" aria-hidden="true"></i>
              Your Interest
            </label>
            <select 
              id="modal-reason" 
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 border border-forest/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest bg-sage/5"
              required
            >
              <option value="">Select a reason</option>
              <option value="eds">I have EDS</option>
              <option value="pots">I have POTS</option>
              <option value="mcas">I have MCAS</option>
              <option value="multiple">I have multiple conditions</option>
              <option value="caregiver">I'm a caregiver</option>
              <option value="practitioner">I'm a healthcare practitioner</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="flex space-x-4">
            <button 
              type="button" 
              id="cancel-request"
              onClick={hideModal}
              className="flex-1 py-3 px-4 border border-forest/20 text-neutral-dark font-semibold rounded-lg hover:bg-neutral-light transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-[#A4613A] hover:bg-[#8E5433] active:bg-[#744428] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[rgba(164,97,58,0.28)]"
            >
              <i className="fas fa-box mr-2" aria-hidden="true"></i>Request Free Sample
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
