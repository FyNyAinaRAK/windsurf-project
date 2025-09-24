import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeaturedNews.css';

const FeaturedNews = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/news/?is_featured=true');
        setFeaturedArticles(response.data.slice(0, 3)); // Limite à 3 articles
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
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Actualités</h2>
          <p className="section-subtitle">
            Découvrez les dernières nouvelles de Nell'Faa Groupe
          </p>
          <Link to="/actualites" className="view-all-link">
            Voir toutes les actualités →
          </Link>
        </div>
        
        <div className="featured-news-grid">
          {featuredArticles.map((article, index) => (
            <Link 
              key={article.id} 
              to={`/actualites/${article.slug}`}
              className={`featured-news-card ${index === 0 ? 'main-featured' : 'side-featured'}`}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
