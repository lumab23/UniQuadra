import "../sections/styles/StudentCard.css";

interface StudentCardProps {
  name?: string;
  registration?: string;
  course?: string;
  sport?: string;
  validUntil?: string;
}

const StudentCard = ({ 
  name = "João Silva",
  registration = "2024001", 
  course = "Engenharia de Software",
  sport = "Todas as modalidades",
  validUntil = "12/2025"
}: StudentCardProps) => {
  return (
    <div className="student-id-card">
      <div className="card-header-section">
        <div className="card-university">UNIFOR</div>
        <div className="card-student-id">STUDENT ID</div>
      </div>
      
      <div className="card-main-content">
        <div className="card-avatar-section">
          <div className="avatar-placeholder">
            <div className="avatar-icon"></div>
          </div>
        </div>
        
        <div className="card-details">
          <div className="detail-row">
            <span className="detail-label">Nome</span>
            <span className="detail-value">{name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Matrícula</span>
            <span className="detail-value">{registration}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Curso</span>
            <span className="detail-value">{course}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Modalidades</span>
            <span className="detail-value">{sport}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Válida até</span>
            <span className="detail-value">{validUntil}</span>
          </div>
        </div>
      </div>
      
      <div className="card-security">
        <div className="security-icon chip-icon"></div>
      </div>
    </div>
  );
};

export default StudentCard;