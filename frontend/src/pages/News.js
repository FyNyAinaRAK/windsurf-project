import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './News.css';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8001/api/news/');
        setArticles(response.data);
        setFilteredArticles(response.data); // Initialiser avec tous les articles
      } catch (error) {
        console.error('Erreur lors du chargement des actualités:', error);
        setError('Impossible de charger les actualités. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredArticles(articles);
        setSearching(false);
        return;
      }

      setSearching(true);
      
      const searchLower = searchTerm.toLowerCase();
      const filtered = articles.filter(
        article =>
          article.title.toLowerCase().includes(searchLower) ||
          (article.content && article.content.toLowerCase().includes(searchLower)) ||
          (article.excerpt && article.excerpt.toLowerCase().includes(searchLower))
      );
      
      setFilteredArticles(filtered);
      setSearching(false);
    }, 300); // Délai de 300ms pour éviter de filtrer à chaque frappe

    return () => clearTimeout(searchTimeout);
  }, [searchTerm, articles]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() !== '') {
      setSearching(true);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des actualités...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-button"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="news-container">
      <Helmet>
        <title>Actualités - Nell'Faa Groupe</title>
        <meta name="description" content="Découvrez les dernières actualités de Nell'Faa Groupe et ses filiales." />
      </Helmet>
      
      <h1>Actualités</h1>
      
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Rechercher des actualités..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Rechercher des actualités"
          />
          {searching && <div className="search-loading">Recherche en cours...</div>}
        </div>
      </div>
      
      {filteredArticles.length === 0 ? (
        <div className="no-results">
          <p>Aucun article ne correspond à votre recherche "{searchTerm}"</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setFilteredArticles(articles);
            }}
            className="clear-search-button"
          >
            Afficher tous les articles
          </button>
        </div>
      ) : (
        <div className="search-results-count">
          {searchTerm ? (
            <p>{filteredArticles.length} résultat(s) trouvé(s) pour "{searchTerm}"</p>
          ) : (
            <p>{filteredArticles.length} article(s) au total</p>
          )}
        </div>
      )}
      
      <div className="news-grid">
        {filteredArticles.map((article) => (
          <div key={article.id} className="news-card">
            {article.image && (
              <div className="news-image">
                <img src={article.image} alt={article.title} loading="lazy" />
              </div>
            )}
            <div className="news-content">
              <h2>{article.title}</h2>
              <p className="news-date">
                {new Date(article.published_date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="news-excerpt">{article.excerpt}</p>
              <Link to={`/actualites/${article.slug}`} className="read-more">
                Lire la suite →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
