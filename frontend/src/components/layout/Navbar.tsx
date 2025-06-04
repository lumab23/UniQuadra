import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ativo, setAtivo] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavItems, setShowNavItems] = useState(true);
  
  useEffect(() => {
    // Esconde os itens de navegação se estiver em uma rota admin
    setShowNavItems(!location.pathname.startsWith('/admin'));
    // Sincroniza underline com a rota
    if (location.pathname === "/carteirinha") {
      setAtivo("Carteirinha");
    } else if (location.pathname === "/") {
      setAtivo("Home");
    } else {
      setAtivo(""); // Nenhum ativo para outras rotas
    }
  }, [location.pathname]);

  interface NavItem {
    label: string;
    href: string;
    type: "scroll" | "route";
  }

  const navItems: NavItem[] = [
    { label: "Home", href: "#home", type: "scroll" },
    { label: "Modalidades", href: "#modalidades", type: "scroll" },
    { label: "Carteirinha", href: "/carteirinha", type: "route" },
  ];

  const handleNavClick = (item: NavItem): void => {
    setAtivo(item.label);

    if (item.type === "route") {
      // Navegação para outra página
      navigate(item.href);
      if (item.href === "/carteirinha") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      return;
    }

    // Navegação por scroll (apenas na página Home)
    if (location.pathname !== "/") {
      // Se não estiver na home, navegar para home primeiro
      navigate("/");
      // Aguardar um pouco para a página carregar e então fazer scroll
      setTimeout(() => {
        if (item.label === "Home") {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        } else {
          const element = document.querySelector(item.href);
          if (element) {
            const navbarHeight = 80;
            const elementPosition = (element as HTMLElement).offsetTop - navbarHeight;
            
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth"
            });
          }
        }
      }, 100);
      return;
    }

    // Se já estiver na home, fazer scroll normalmente
    if (item.label === "Home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    const element = document.querySelector(item.href);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = (element as HTMLElement).offsetTop - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const handleAdminClick = (): void => {
    setShowNavItems(false);
    navigate("/admin/login");
    console.log("Unifor Sports Online clicked - Admin login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo-section" onClick={() => handleNavClick({ label: "Home", href: "#home", type: "scroll" })}>
            <div className="logo-icon">
              <span>U</span>
            </div>
            <span className="logo-text">UNIFOR SPORTS</span>
          </div>

          {/* Desktop Navigation */}
          {showNavItems && (
            <div className="desktop-nav">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`nav-button ${ativo === item.label ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Admin Section */}
          <div className="admin-section">
            <button
              onClick={handleAdminClick}
              className="admin-button"
            >
              Unifor Sports Online
            </button>
          </div>

          {/* Mobile menu button */}
          {showNavItems && (
            <div className="mobile-menu-btn-container">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-menu-btn"
              >
                <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && showNavItems && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  handleNavClick(item);
                  setMobileMenuOpen(false);
                }}
                className={`mobile-menu-item ${ativo === item.label ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
            {/* Admin button no menu mobile */}
            <button
              onClick={() => {
                handleAdminClick();
                setMobileMenuOpen(false);
              }}
              className="mobile-menu-item admin-mobile"
            >
              Unifor Sports Online
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;