import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FadeInOnScroll, StaggerContainer, StaggerItem, ParallaxWrapper } from './ScrollAnimations';
import './FeaturedNews.css';

const FeaturedNews = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/news/?is_featured=true`);
        // Gérer la réponse paginée
        const articlesData = response.data.results || response.data;
        setFeaturedArticles(articlesData.slice(0, 3)); // Limite à 3 articles
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des articles featured:', error);
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'UTC'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading || featuredArticles.length === 0) {
    return null;
  }

  return (
    <section className="section featured-news-home">
      <ParallaxWrapper speed={0.3} direction="up">
        <div className="container">
          <FadeInOnScroll direction="up" delay={0.2}>
            <div className="section-header">
              <h2 className="section-title">Actualités</h2>
              <p className="section-subtitle">
                Découvrez les dernières nouvelles de Nell'Faa Groupe
              </p>
              <Link to="/actualites" className="view-all-link morph-btn">
                Voir toutes les actualités →
              </Link>
            </div>
          </FadeInOnScroll>
          
          <StaggerContainer staggerDelay={0.2}>
            <div className="featured-news-grid">
              {/* Première carte en haut */}
              {featuredArticles.slice(0, 1).map((article) => (
                <StaggerItem key={article.id} direction="up" distance={50}>
                  <Link 
                    to={`/actualites/${article.slug}`}
                    className="featured-news-card interactive-card tilt-effect"
                  >
                    <div className="featured-news-image">
                      {article.image ? (
                        <img src={article.image} alt={article.title} />
                      ) : (
                        <div className="placeholder-image">
                          <span>📰</span>
                        </div>
                      )}
                      <div className="featured-badge">À la Une</div>
                    </div>
                    <div className="featured-news-content">
                      <div className="featured-news-meta">
                        <span className="date">{formatDate(article.published_date)}</span>
                      </div>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <span className="read-more">Lire la suite →</span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
              
              {/* Deux cartes en bas */}
              <div className="featured-news-bottom">
                {featuredArticles.slice(1, 3).map((article) => (
                  <StaggerItem key={article.id} direction="up" distance={30}>
                    <Link 
                      to={`/actualites/${article.slug}`}
                      className="featured-news-card interactive-card tilt-effect"
                    >
                      <div className="featured-news-image">
                        {article.image ? (
                          <img src={article.image} alt={article.title} />
                        ) : (
                          <div className="placeholder-image">
                            <span>📰</span>
                          </div>
                        )}
                        <div className="featured-badge">À la Une</div>
                      </div>
                      <div className="featured-news-content">
                        <div className="featured-news-meta">
                          <span className="date">{formatDate(article.published_date)}</span>
                        </div>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <span className="read-more">Lire la suite →</span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </div>
          </StaggerContainer>
        </div>
      </ParallaxWrapper>
    </section>
  );
};

export default FeaturedNews;
