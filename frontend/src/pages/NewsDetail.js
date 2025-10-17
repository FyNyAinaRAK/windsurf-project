import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './NewsDetail.css';

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const [articleResponse, relatedResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/news/${slug}/`),
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/news/?page_size=4`)
        ]);
        
        setArticle(articleResponse.data);
        // Gérer la réponse paginée et exclure l'article actuel
        const relatedData = relatedResponse.data.results || relatedResponse.data;
        setRelatedArticles(
          relatedData.filter(article => article.slug !== slug).slice(0, 3)
        );
      } catch (err) {
        console.error('Erreur lors du chargement de l\'article:', err);
        setError('Impossible de charger l\'article demandé.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Chargement de l'article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="error-container">
        <h2>Erreur</h2>
        <p>{error || 'Article non trouvé'}</p>
        <button onClick={() => navigate('/actualites')} className="back-button">
          Retour aux actualités
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="news-detail-container">
      <Helmet>
        <title>{article.title} - Actualités - Nell'Faa Groupe</title>
        <meta name="description" content={article.meta_description || article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        {article.image && <meta property="og:image" content={article.image} />}
      </Helmet>

      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Retour
      </button>

      <article className="article-container">
        <header className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="article-date">{formatDate(article.published_date)}</span>
            {article.author && (
              <span className="article-author">Par {article.author}</span>
            )}
          </div>
        </header>

        {article.image && (
          <div className="article-image">
            <img src={article.image} alt={article.title} />
          </div>
        )}

        <div 
          className="article-content" 
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {relatedArticles.length > 0 && (
        <aside className="related-articles">
          <h2>Articles similaires</h2>
          <div className="related-grid">
            {relatedArticles.map((related) => (
              <div key={related.id} className="related-article">
                {related.image && (
                  <div className="related-image">
                    <img src={related.image} alt={related.title} />
                  </div>
                )}
                <div className="related-content">
                  <h3>
                    <Link to={`/actualites/${related.slug}`}>
                      {related.title}
                    </Link>
                  </h3>
                  <p className="related-date">{formatDate(related.published_date)}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
};

export default NewsDetail;
