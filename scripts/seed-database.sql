-- ============================================================================
-- POKY GROUP Blog Database Seed Script
-- ============================================================================
-- This script populates the blog database with sample data for testing
-- Run this in the Supabase SQL Editor
-- 
-- Note: This script uses ON CONFLICT DO NOTHING to allow safe re-running
-- ============================================================================

-- ============================================================================
-- STEP 1: Clear existing data (OPTIONAL - Uncomment if you want fresh start)
-- ============================================================================
-- DELETE FROM post_tags;
-- DELETE FROM media_assets;
-- DELETE FROM affiliate_links;
-- DELETE FROM post_translations;
-- DELETE FROM posts;
-- DELETE FROM tag_translations;
-- DELETE FROM tags;
-- DELETE FROM category_translations;
-- DELETE FROM categories;
-- DELETE FROM authors;

-- ============================================================================
-- STEP 1.5: Enhance affiliate_links table schema (if columns don't exist)
-- ============================================================================
-- Add optional but recommended columns for enhanced affiliate product display
-- These are safe to run multiple times (IF NOT EXISTS)

ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2);
ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS price TEXT;
ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS badge TEXT CHECK (badge IN ('best-value', 'popular', 'editors-choice'));
ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;
ALTER TABLE affiliate_links ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- ============================================================================
-- STEP 2: Insert Authors
-- ============================================================================

INSERT INTO authors (slug, name, bio, avatar_url) VALUES
('poky-group-team', 'POKY GROUP Team', 'The POKY GROUP development team specializes in building innovative software solutions using cutting-edge technologies.', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO authors (slug, name, bio, avatar_url) VALUES
('tech-lead', 'Jospen Wolongwo', 'Senior Tech Lead with 10+ years of experience in full-stack development, cloud architecture, and AI solutions.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO authors (slug, name, bio, avatar_url) VALUES
('senior-developer', 'Leaticia Yankap', 'Senior Developer passionate about React, Next.js, and creating exceptional user experiences.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- STEP 3: Insert Categories
-- ============================================================================

INSERT INTO categories (slug, label) VALUES
('web-development', 'Web Development'),
('ai-ml', 'AI & ML'),
('cloud-devops', 'Cloud & DevOps'),
('security', 'Security'),
('backend-development', 'Backend Development'),
('programming', 'Programming')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- STEP 4: Insert Category Translations (EN/FR)
-- ============================================================================

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'en', 'Web Development', 'Articles about modern web development, frameworks, and best practices'
FROM categories WHERE slug = 'web-development'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'fr', 'Développement Web', 'Articles sur le développement web moderne, les frameworks et les meilleures pratiques'
FROM categories WHERE slug = 'web-development'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'en', 'AI & ML', 'Artificial Intelligence and Machine Learning insights and implementations'
FROM categories WHERE slug = 'ai-ml'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'fr', 'IA & ML', 'Intelligence Artificielle et Apprentissage Automatique : insights et implémentations'
FROM categories WHERE slug = 'ai-ml'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'en', 'Cloud & DevOps', 'Cloud infrastructure, DevOps practices, and deployment strategies'
FROM categories WHERE slug = 'cloud-devops'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'fr', 'Cloud & DevOps', 'Infrastructure cloud, pratiques DevOps et stratégies de déploiement'
FROM categories WHERE slug = 'cloud-devops'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'en', 'Security', 'Cybersecurity best practices, authentication, and data protection'
FROM categories WHERE slug = 'security'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'fr', 'Sécurité', 'Meilleures pratiques en cybersécurité, authentification et protection des données'
FROM categories WHERE slug = 'security'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'en', 'Backend Development', 'Server-side development, APIs, databases, and architecture'
FROM categories WHERE slug = 'backend-development'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'fr', 'Développement Backend', 'Développement côté serveur, APIs, bases de données et architecture'
FROM categories WHERE slug = 'backend-development'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'en', 'Programming', 'General programming concepts, languages, and coding best practices'
FROM categories WHERE slug = 'programming'
ON CONFLICT DO NOTHING;

INSERT INTO category_translations (category_id, locale, name, description)
SELECT id, 'fr', 'Programmation', 'Concepts de programmation, langages et meilleures pratiques de codage'
FROM categories WHERE slug = 'programming'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 5: Insert Tags
-- ============================================================================

INSERT INTO tags (slug, label) VALUES
('nextjs', 'Next.js'),
('react', 'React'),
('typescript', 'TypeScript'),
('supabase', 'Supabase'),
('aws', 'AWS'),
('docker', 'Docker'),
('nodejs', 'Node.js'),
('postgresql', 'PostgreSQL'),
('tailwindcss', 'Tailwind CSS'),
('javascript', 'JavaScript'),
('ai', 'AI'),
('machine-learning', 'Machine Learning')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- STEP 6: Insert Tag Translations (EN/FR)
-- ============================================================================

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'Next.js' FROM tags WHERE slug = 'nextjs'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'Next.js' FROM tags WHERE slug = 'nextjs'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'React' FROM tags WHERE slug = 'react'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'React' FROM tags WHERE slug = 'react'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'TypeScript' FROM tags WHERE slug = 'typescript'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'TypeScript' FROM tags WHERE slug = 'typescript'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'Supabase' FROM tags WHERE slug = 'supabase'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'Supabase' FROM tags WHERE slug = 'supabase'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'AWS' FROM tags WHERE slug = 'aws'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'AWS' FROM tags WHERE slug = 'aws'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'Docker' FROM tags WHERE slug = 'docker'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'Docker' FROM tags WHERE slug = 'docker'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'Node.js' FROM tags WHERE slug = 'nodejs'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'Node.js' FROM tags WHERE slug = 'nodejs'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'PostgreSQL' FROM tags WHERE slug = 'postgresql'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'PostgreSQL' FROM tags WHERE slug = 'postgresql'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'Tailwind CSS' FROM tags WHERE slug = 'tailwindcss'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'Tailwind CSS' FROM tags WHERE slug = 'tailwindcss'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'JavaScript' FROM tags WHERE slug = 'javascript'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'JavaScript' FROM tags WHERE slug = 'javascript'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'AI' FROM tags WHERE slug = 'ai'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'IA' FROM tags WHERE slug = 'ai'
ON CONFLICT DO NOTHING;

INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'en', 'Machine Learning' FROM tags WHERE slug = 'machine-learning'
ON CONFLICT DO NOTHING;
INSERT INTO tag_translations (tag_id, locale, name)
SELECT id, 'fr', 'Apprentissage Automatique' FROM tags WHERE slug = 'machine-learning'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 7: Insert Blog Posts
-- ============================================================================

-- Post 1
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'building-scalable-web-applications-nextjs-14',
  'published',
  NOW() - INTERVAL '15 days',
  (SELECT id FROM categories WHERE slug = 'web-development'),
  'Alex Johnson'
ON CONFLICT (slug) DO NOTHING;

-- Post 2
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'future-ai-software-development',
  'published',
  NOW() - INTERVAL '20 days',
  (SELECT id FROM categories WHERE slug = 'ai-ml'),
  'POKY GROUP Team'
ON CONFLICT (slug) DO NOTHING;

-- Post 3
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'cloud-architecture-best-practices-startups',
  'published',
  NOW() - INTERVAL '25 days',
  (SELECT id FROM categories WHERE slug = 'cloud-devops'),
  'Alex Johnson'
ON CONFLICT (slug) DO NOTHING;

-- Post 4
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'modern-authentication-strategies-web-apps',
  'published',
  NOW() - INTERVAL '30 days',
  (SELECT id FROM categories WHERE slug = 'security'),
  'Sarah Chen'
ON CONFLICT (slug) DO NOTHING;

-- Post 5
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'building-realtime-applications-supabase',
  'published',
  NOW() - INTERVAL '35 days',
  (SELECT id FROM categories WHERE slug = 'backend-development'),
  'Sarah Chen'
ON CONFLICT (slug) DO NOTHING;

-- Post 6
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'complete-guide-typescript-best-practices',
  'published',
  NOW() - INTERVAL '40 days',
  (SELECT id FROM categories WHERE slug = 'programming'),
  'Alex Johnson'
ON CONFLICT (slug) DO NOTHING;

-- Post 7
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'react-server-components-future-web-development',
  'published',
  NOW() - INTERVAL '10 days',
  (SELECT id FROM categories WHERE slug = 'web-development'),
  'Sarah Chen'
ON CONFLICT (slug) DO NOTHING;

-- Post 8
INSERT INTO posts (slug, status, published_at, category_id, author)
SELECT 
  'dockerizing-nextjs-application',
  'published',
  NOW() - INTERVAL '5 days',
  (SELECT id FROM categories WHERE slug = 'cloud-devops'),
  'POKY GROUP Team'
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- STEP 8: Insert Blog Post Translations (EN/FR)
-- ============================================================================

-- Post 1 EN
-- Note: To add affiliate links inline in content, use placeholders like [affiliate:UUID]
-- Example: "Check out [affiliate:abc123-def456] for hosting options"
-- Get affiliate link IDs by running: SELECT id, product FROM affiliate_links WHERE post_id = (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14');
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'Building Scalable Web Applications with Next.js 14',
  'Learn how to leverage the latest Next.js features to build performant and scalable web applications that can handle millions of users.',
  '<h2>Introduction</h2><p>Next.js 14 introduces groundbreaking features that revolutionize how we build web applications. In this comprehensive guide, we''ll explore the key improvements and how they can help you create scalable, high-performance applications.</p><h2>Key Features</h2><ul><li>Server Components for improved performance</li><li>Enhanced caching strategies</li><li>Improved developer experience</li><li>Better TypeScript support</li></ul><h2>Best Practices</h2><p>When building scalable applications, it''s crucial to follow best practices. This includes proper code splitting, efficient data fetching, and optimized rendering strategies.</p><h2>Conclusion</h2><p>Next.js 14 provides the tools you need to build applications that scale. By following these guidelines, you can create robust, performant web applications.</p>',
  'Building Scalable Web Applications with Next.js 14 - Complete Guide',
  'Learn how to build scalable web applications using Next.js 14. Discover best practices, performance optimization, and modern development techniques.'
FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'
ON CONFLICT DO NOTHING;

-- Post 1 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'Construire des Applications Web Évolutives avec Next.js 14',
  'Apprenez à tirer parti des dernières fonctionnalités de Next.js pour créer des applications web performantes et évolutives capables de gérer des millions d''utilisateurs.',
  '<h2>Introduction</h2><p>Next.js 14 introduit des fonctionnalités révolutionnaires qui transforment la façon dont nous construisons des applications web. Dans ce guide complet, nous explorerons les améliorations clés et comment elles peuvent vous aider à créer des applications évolutives et performantes.</p><h2>Fonctionnalités Clés</h2><ul><li>Composants Serveur pour une meilleure performance</li><li>Stratégies de mise en cache améliorées</li><li>Meilleure expérience développeur</li><li>Meilleur support TypeScript</li></ul><h2>Meilleures Pratiques</h2><p>Lors de la construction d''applications évolutives, il est crucial de suivre les meilleures pratiques. Cela inclut le fractionnement de code approprié, la récupération efficace des données et les stratégies de rendu optimisées.</p><h2>Conclusion</h2><p>Next.js 14 fournit les outils nécessaires pour créer des applications qui évoluent. En suivant ces directives, vous pouvez créer des applications web robustes et performantes.</p>',
  'Construire des Applications Web Évolutives avec Next.js 14 - Guide Complet',
  'Apprenez à créer des applications web évolutives en utilisant Next.js 14. Découvrez les meilleures pratiques, l''optimisation des performances et les techniques de développement modernes.'
FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'
ON CONFLICT DO NOTHING;

-- Post 2 EN
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'The Future of AI in Software Development',
  'Exploring how artificial intelligence is revolutionizing the way we write, test, and deploy software applications.',
  '<h2>The AI Revolution</h2><p>Artificial Intelligence is no longer a futuristic concept—it''s here, and it''s transforming software development in unprecedented ways.</p><h2>AI-Powered Development Tools</h2><p>Modern AI tools can assist developers in writing code, debugging, and even designing architectures. These tools are becoming increasingly sophisticated and integrated into our workflows.</p><h2>Benefits and Challenges</h2><p>While AI brings tremendous benefits, it also presents challenges. Understanding both sides is crucial for developers looking to leverage AI effectively.</p><h2>Looking Ahead</h2><p>The future of software development will be increasingly AI-assisted. Developers who embrace these tools will have a significant advantage.</p>',
  'The Future of AI in Software Development - Trends and Insights',
  'Discover how AI is transforming software development. Learn about AI-powered tools, their benefits, and how to integrate them into your workflow.'
FROM posts WHERE slug = 'future-ai-software-development'
ON CONFLICT DO NOTHING;

-- Post 2 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'L''Avenir de l''IA dans le Développement Logiciel',
  'Exploration de la façon dont l''intelligence artificielle révolutionne la manière dont nous écrivons, testons et déployons des applications logicielles.',
  '<h2>La Révolution IA</h2><p>L''intelligence artificielle n''est plus un concept futuriste—elle est là, et elle transforme le développement logiciel de manière sans précédent.</p><h2>Outils de Développement Alimentés par l''IA</h2><p>Les outils IA modernes peuvent aider les développeurs à écrire du code, déboguer et même concevoir des architectures. Ces outils deviennent de plus en plus sophistiqués et intégrés dans nos flux de travail.</p><h2>Avantages et Défis</h2><p>Bien que l''IA apporte des avantages considérables, elle présente également des défis. Comprendre les deux côtés est crucial pour les développeurs qui cherchent à exploiter l''IA efficacement.</p><h2>Regard vers l''Avenir</h2><p>L''avenir du développement logiciel sera de plus en plus assisté par l''IA. Les développeurs qui adoptent ces outils auront un avantage significatif.</p>',
  'L''Avenir de l''IA dans le Développement Logiciel - Tendances et Insights',
  'Découvrez comment l''IA transforme le développement logiciel. Apprenez-en plus sur les outils alimentés par l''IA, leurs avantages et comment les intégrer dans votre flux de travail.'
FROM posts WHERE slug = 'future-ai-software-development'
ON CONFLICT DO NOTHING;

-- Post 3 EN
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'Cloud Architecture Best Practices for Startups',
  'Essential cloud architecture patterns and practices that help startups scale efficiently while managing costs.',
  '<h2>Why Cloud Architecture Matters</h2><p>For startups, choosing the right cloud architecture can make the difference between success and failure. It''s not just about cost—it''s about scalability, reliability, and speed to market.</p><h2>Key Architecture Patterns</h2><ul><li>Microservices architecture</li><li>Serverless computing</li><li>Container orchestration</li><li>Event-driven architecture</li></ul><h2>Cost Optimization</h2><p>Startups need to be smart about cloud costs. Learn how to optimize your infrastructure without sacrificing performance.</p><h2>Scaling Strategies</h2><p>Plan for growth from day one. Discover strategies that allow you to scale seamlessly as your user base grows.</p>',
  'Cloud Architecture Best Practices for Startups - Complete Guide',
  'Learn essential cloud architecture patterns and practices for startups. Discover cost optimization strategies and scaling techniques.'
FROM posts WHERE slug = 'cloud-architecture-best-practices-startups'
ON CONFLICT DO NOTHING;

-- Post 3 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'Meilleures Pratiques d''Architecture Cloud pour les Startups',
  'Modèles et pratiques d''architecture cloud essentiels qui aident les startups à évoluer efficacement tout en gérant les coûts.',
  '<h2>Pourquoi l''Architecture Cloud Compte</h2><p>Pour les startups, choisir la bonne architecture cloud peut faire la différence entre le succès et l''échec. Il ne s''agit pas seulement de coût—il s''agit d''évolutivité, de fiabilité et de rapidité de mise sur le marché.</p><h2>Modèles d''Architecture Clés</h2><ul><li>Architecture microservices</li><li>Informatique sans serveur</li><li>Orchestration de conteneurs</li><li>Architecture orientée événements</li></ul><h2>Optimisation des Coûts</h2><p>Les startups doivent être intelligentes concernant les coûts cloud. Apprenez à optimiser votre infrastructure sans sacrifier les performances.</p><h2>Stratégies d''Évolution</h2><p>Planifiez la croissance dès le premier jour. Découvrez des stratégies qui vous permettent d''évoluer de manière transparente à mesure que votre base d''utilisateurs grandit.</p>',
  'Meilleures Pratiques d''Architecture Cloud pour les Startups - Guide Complet',
  'Apprenez les modèles et pratiques d''architecture cloud essentiels pour les startups. Découvrez les stratégies d''optimisation des coûts et les techniques d''évolution.'
FROM posts WHERE slug = 'cloud-architecture-best-practices-startups'
ON CONFLICT DO NOTHING;

-- Post 4 EN
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'Modern Authentication Strategies for Web Apps',
  'A comprehensive guide to implementing secure authentication in modern web applications using OAuth, JWT, and more.',
  '<h2>The Importance of Secure Authentication</h2><p>Authentication is the foundation of application security. In today''s digital landscape, implementing robust authentication is non-negotiable.</p><h2>Authentication Methods</h2><ul><li>OAuth 2.0 and OpenID Connect</li><li>JWT tokens</li><li>Session-based authentication</li><li>Multi-factor authentication</li></ul><h2>Best Practices</h2><p>Learn the essential practices for secure authentication, including password hashing, token management, and session handling.</p><h2>Implementation Guide</h2><p>Step-by-step guide to implementing authentication in your Next.js application using industry-standard practices.</p>',
  'Modern Authentication Strategies for Web Apps - Security Guide',
  'Learn how to implement secure authentication in web applications. Discover OAuth, JWT, and best practices for authentication.'
FROM posts WHERE slug = 'modern-authentication-strategies-web-apps'
ON CONFLICT DO NOTHING;

-- Post 4 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'Stratégies d''Authentification Modernes pour les Applications Web',
  'Guide complet pour implémenter une authentification sécurisée dans les applications web modernes en utilisant OAuth, JWT et plus encore.',
  '<h2>L''Importance de l''Authentification Sécurisée</h2><p>L''authentification est la base de la sécurité des applications. Dans le paysage numérique d''aujourd''hui, l''implémentation d''une authentification robuste est non négociable.</p><h2>Méthodes d''Authentification</h2><ul><li>OAuth 2.0 et OpenID Connect</li><li>Jetons JWT</li><li>Authentification basée sur les sessions</li><li>Authentification multi-facteurs</li></ul><h2>Meilleures Pratiques</h2><p>Apprenez les pratiques essentielles pour une authentification sécurisée, y compris le hachage des mots de passe, la gestion des jetons et la gestion des sessions.</p><h2>Guide d''Implémentation</h2><p>Guide étape par étape pour implémenter l''authentification dans votre application Next.js en utilisant des pratiques standard de l''industrie.</p>',
  'Stratégies d''Authentification Modernes pour les Applications Web - Guide de Sécurité',
  'Apprenez à implémenter une authentification sécurisée dans les applications web. Découvrez OAuth, JWT et les meilleures pratiques d''authentification.'
FROM posts WHERE slug = 'modern-authentication-strategies-web-apps'
ON CONFLICT DO NOTHING;

-- Post 5 EN
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'Building Real-time Applications with Supabase',
  'Learn how to create real-time applications using Supabase''s powerful features including real-time subscriptions and edge functions.',
  '<h2>Why Real-time Matters</h2><p>Real-time capabilities are becoming essential for modern applications. Users expect instant updates, live collaboration, and responsive interfaces.</p><h2>Supabase Real-time Features</h2><p>Supabase provides powerful real-time capabilities out of the box. Learn how to leverage these features in your applications.</p><h2>Implementation</h2><ul><li>Setting up real-time subscriptions</li><li>Handling connection states</li><li>Optimizing performance</li><li>Error handling strategies</li></ul><h2>Best Practices</h2><p>Discover best practices for building real-time applications that are both performant and reliable.</p>',
  'Building Real-time Applications with Supabase - Complete Tutorial',
  'Learn how to build real-time applications using Supabase. Discover real-time subscriptions, edge functions, and best practices.'
FROM posts WHERE slug = 'building-realtime-applications-supabase'
ON CONFLICT DO NOTHING;

-- Post 5 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'Construire des Applications en Temps Réel avec Supabase',
  'Apprenez à créer des applications en temps réel en utilisant les fonctionnalités puissantes de Supabase, y compris les abonnements en temps réel et les fonctions edge.',
  '<h2>Pourquoi le Temps Réel Compte</h2><p>Les capacités en temps réel deviennent essentielles pour les applications modernes. Les utilisateurs s''attendent à des mises à jour instantanées, une collaboration en direct et des interfaces réactives.</p><h2>Fonctionnalités Temps Réel de Supabase</h2><p>Supabase fournit des capacités en temps réel puissantes prêtes à l''emploi. Apprenez à exploiter ces fonctionnalités dans vos applications.</p><h2>Implémentation</h2><ul><li>Configuration des abonnements en temps réel</li><li>Gestion des états de connexion</li><li>Optimisation des performances</li><li>Stratégies de gestion des erreurs</li></ul><h2>Meilleures Pratiques</h2><p>Découvrez les meilleures pratiques pour créer des applications en temps réel à la fois performantes et fiables.</p>',
  'Construire des Applications en Temps Réel avec Supabase - Tutoriel Complet',
  'Apprenez à créer des applications en temps réel en utilisant Supabase. Découvrez les abonnements en temps réel, les fonctions edge et les meilleures pratiques.'
FROM posts WHERE slug = 'building-realtime-applications-supabase'
ON CONFLICT DO NOTHING;

-- Post 6 EN
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'The Complete Guide to TypeScript Best Practices',
  'Master TypeScript with these essential best practices that will make your code more maintainable and type-safe.',
  '<h2>Why TypeScript?</h2><p>TypeScript brings type safety to JavaScript, helping developers catch errors early and write more maintainable code.</p><h2>Essential Best Practices</h2><ul><li>Strict type checking</li><li>Proper interface design</li><li>Generic types and utility types</li><li>Type inference strategies</li></ul><h2>Common Pitfalls</h2><p>Avoid common TypeScript mistakes that can lead to runtime errors or poor code quality.</p><h2>Advanced Patterns</h2><p>Explore advanced TypeScript patterns that can help you write more elegant and type-safe code.</p>',
  'TypeScript Best Practices - Complete Guide for Developers',
  'Master TypeScript with this comprehensive guide. Learn best practices, common pitfalls, and advanced patterns for type-safe code.'
FROM posts WHERE slug = 'complete-guide-typescript-best-practices'
ON CONFLICT DO NOTHING;

-- Post 6 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'Le Guide Complet des Meilleures Pratiques TypeScript',
  'Maîtrisez TypeScript avec ces meilleures pratiques essentielles qui rendront votre code plus maintenable et sûr au niveau des types.',
  '<h2>Pourquoi TypeScript?</h2><p>TypeScript apporte la sécurité de type à JavaScript, aidant les développeurs à détecter les erreurs tôt et à écrire du code plus maintenable.</p><h2>Meilleures Pratiques Essentielles</h2><ul><li>Vérification stricte des types</li><li>Conception d''interface appropriée</li><li>Types génériques et types utilitaires</li><li>Stratégies d''inférence de type</li></ul><h2>Pièges Courants</h2><p>Évitez les erreurs TypeScript courantes qui peuvent conduire à des erreurs d''exécution ou à une mauvaise qualité de code.</p><h2>Modèles Avancés</h2><p>Explorez les modèles TypeScript avancés qui peuvent vous aider à écrire du code plus élégant et sûr au niveau des types.</p>',
  'Meilleures Pratiques TypeScript - Guide Complet pour les Développeurs',
  'Maîtrisez TypeScript avec ce guide complet. Apprenez les meilleures pratiques, les pièges courants et les modèles avancés pour un code sûr au niveau des types.'
FROM posts WHERE slug = 'complete-guide-typescript-best-practices'
ON CONFLICT DO NOTHING;

-- Post 7 EN
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'React Server Components: The Future of Web Development',
  'Discover how React Server Components revolutionize web development by enabling better performance and developer experience.',
  '<h2>What are Server Components?</h2><p>React Server Components represent a paradigm shift in how we think about React applications. They enable server-side rendering with a new level of efficiency.</p><h2>Key Benefits</h2><ul><li>Reduced bundle size</li><li>Improved performance</li><li>Better SEO</li><li>Enhanced developer experience</li></ul><h2>Getting Started</h2><p>Learn how to start using Server Components in your Next.js applications and unlock their full potential.</p><h2>Best Practices</h2><p>Understand when to use Server Components versus Client Components and how to structure your application for optimal performance.</p>',
  'React Server Components Guide - Future of Web Development',
  'Learn about React Server Components and how they revolutionize web development. Discover benefits, implementation, and best practices.'
FROM posts WHERE slug = 'react-server-components-future-web-development'
ON CONFLICT DO NOTHING;

-- Post 7 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'Composants Serveur React : L''Avenir du Développement Web',
  'Découvrez comment les Composants Serveur React révolutionnent le développement web en permettant de meilleures performances et une meilleure expérience développeur.',
  '<h2>Qu''est-ce que les Composants Serveur?</h2><p>Les Composants Serveur React représentent un changement de paradigme dans la façon dont nous pensons aux applications React. Ils permettent le rendu côté serveur avec un nouveau niveau d''efficacité.</p><h2>Avantages Clés</h2><ul><li>Réduction de la taille du bundle</li><li>Amélioration des performances</li><li>Meilleur SEO</li><li>Meilleure expérience développeur</li></ul><h2>Pour Commencer</h2><p>Apprenez à commencer à utiliser les Composants Serveur dans vos applications Next.js et débloquez leur plein potentiel.</p><h2>Meilleures Pratiques</h2><p>Comprenez quand utiliser les Composants Serveur par rapport aux Composants Client et comment structurer votre application pour des performances optimales.</p>',
  'Guide des Composants Serveur React - Avenir du Développement Web',
  'Apprenez-en plus sur les Composants Serveur React et comment ils révolutionnent le développement web. Découvrez les avantages, l''implémentation et les meilleures pratiques.'
FROM posts WHERE slug = 'react-server-components-future-web-development'
ON CONFLICT DO NOTHING;

-- Post 8 EN
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'en',
  'Dockerizing Your Next.js Application',
  'A step-by-step guide to containerizing your Next.js application with Docker for easier deployment and scaling.',
  '<h2>Why Docker?</h2><p>Docker simplifies deployment, ensures consistency across environments, and makes scaling applications easier than ever.</p><h2>Creating a Dockerfile</h2><p>Learn how to create an optimized Dockerfile for your Next.js application that ensures fast builds and small image sizes.</p><h2>Docker Compose Setup</h2><p>Set up a complete development environment with Docker Compose, including your application, database, and other services.</p><h2>Deployment Strategies</h2><p>Discover best practices for deploying Dockerized Next.js applications to production environments.</p>',
  'Dockerizing Next.js Application - Complete Docker Guide',
  'Learn how to dockerize your Next.js application. Step-by-step guide to Docker, Dockerfile optimization, and deployment strategies.'
FROM posts WHERE slug = 'dockerizing-nextjs-application'
ON CONFLICT DO NOTHING;

-- Post 8 FR
INSERT INTO post_translations (post_id, locale, title, excerpt, content, seo_title, seo_description)
SELECT 
  id,
  'fr',
  'Dockeriser Votre Application Next.js',
  'Guide étape par étape pour conteneuriser votre application Next.js avec Docker pour un déploiement et une mise à l''échelle plus faciles.',
  '<h2>Pourquoi Docker?</h2><p>Docker simplifie le déploiement, assure la cohérence entre les environnements et facilite la mise à l''échelle des applications plus que jamais.</p><h2>Créer un Dockerfile</h2><p>Apprenez à créer un Dockerfile optimisé pour votre application Next.js qui assure des builds rapides et de petites tailles d''image.</p><h2>Configuration Docker Compose</h2><p>Configurez un environnement de développement complet avec Docker Compose, y compris votre application, base de données et autres services.</p><h2>Stratégies de Déploiement</h2><p>Découvrez les meilleures pratiques pour déployer des applications Next.js dockerisées dans des environnements de production.</p>',
  'Dockeriser Application Next.js - Guide Docker Complet',
  'Apprenez à dockeriser votre application Next.js. Guide étape par étape sur Docker, l''optimisation Dockerfile et les stratégies de déploiement.'
FROM posts WHERE slug = 'dockerizing-nextjs-application'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 9: Link Posts to Tags (post_tags)
-- ============================================================================

-- Post 1: Next.js, React, TypeScript
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'),
  (SELECT id FROM tags WHERE slug = 'nextjs')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'),
  (SELECT id FROM tags WHERE slug = 'react')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'),
  (SELECT id FROM tags WHERE slug = 'typescript')
ON CONFLICT DO NOTHING;

-- Post 2: AI, Machine Learning
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'future-ai-software-development'),
  (SELECT id FROM tags WHERE slug = 'ai')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'future-ai-software-development'),
  (SELECT id FROM tags WHERE slug = 'machine-learning')
ON CONFLICT DO NOTHING;

-- Post 3: AWS, Docker, Cloud
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'cloud-architecture-best-practices-startups'),
  (SELECT id FROM tags WHERE slug = 'aws')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'cloud-architecture-best-practices-startups'),
  (SELECT id FROM tags WHERE slug = 'docker')
ON CONFLICT DO NOTHING;

-- Post 4: Security, JavaScript
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'modern-authentication-strategies-web-apps'),
  (SELECT id FROM tags WHERE slug = 'javascript')
ON CONFLICT DO NOTHING;

-- Post 5: Supabase, PostgreSQL, Backend
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-realtime-applications-supabase'),
  (SELECT id FROM tags WHERE slug = 'supabase')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-realtime-applications-supabase'),
  (SELECT id FROM tags WHERE slug = 'postgresql')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-realtime-applications-supabase'),
  (SELECT id FROM tags WHERE slug = 'nodejs')
ON CONFLICT DO NOTHING;

-- Post 6: TypeScript, Programming
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'complete-guide-typescript-best-practices'),
  (SELECT id FROM tags WHERE slug = 'typescript')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'complete-guide-typescript-best-practices'),
  (SELECT id FROM tags WHERE slug = 'javascript')
ON CONFLICT DO NOTHING;

-- Post 7: React, Next.js
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'react-server-components-future-web-development'),
  (SELECT id FROM tags WHERE slug = 'react')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'react-server-components-future-web-development'),
  (SELECT id FROM tags WHERE slug = 'nextjs')
ON CONFLICT DO NOTHING;

-- Post 8: Docker, Next.js, DevOps
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'dockerizing-nextjs-application'),
  (SELECT id FROM tags WHERE slug = 'docker')
ON CONFLICT DO NOTHING;
INSERT INTO post_tags (post_id, tag_id)
SELECT 
  (SELECT id FROM posts WHERE slug = 'dockerizing-nextjs-application'),
  (SELECT id FROM tags WHERE slug = 'nextjs')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 10: Add Affiliate Links (Multiple examples for testing)
-- ============================================================================

-- Post 1: Next.js Hosting Options
INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'),
  'Vercel',
  'Next.js Hosting',
  'https://vercel.com/nextjs',
  'Get Started with Vercel',
  'ref=blog-nextjs-guide',
  'Vercel - The Best Platform for Next.js',
  'Deploy your Next.js applications with zero configuration. Automatic HTTPS, global CDN, and instant deployments.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
  4.8,
  'Free - $20/month',
  'editors-choice',
  1,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'),
  'Netlify',
  'Netlify Hosting',
  'https://www.netlify.com',
  'Try Netlify Free',
  'ref=blog-nextjs-guide',
  'Netlify - Powerful Hosting Platform',
  'Deploy static sites and serverless functions with continuous deployment and edge functions.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
  4.6,
  'Free - $19/month',
  'popular',
  2,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'),
  'AWS',
  'AWS Amplify',
  'https://aws.amazon.com/amplify',
  'Explore AWS Amplify',
  'ref=blog-nextjs-guide',
  'AWS Amplify - Enterprise-Grade Hosting',
  'Full-stack hosting solution with authentication, storage, and API capabilities built-in.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
  4.5,
  'Pay as you go',
  'best-value',
  3,
  false
ON CONFLICT DO NOTHING;

-- Post 2: AI Development Tools
INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'future-ai-software-development'),
  'GitHub',
  'GitHub Copilot',
  'https://github.com/features/copilot',
  'Try GitHub Copilot',
  'ref=blog-ai-guide',
  'GitHub Copilot - AI Pair Programmer',
  'Your AI pair programmer that suggests code and entire functions in real-time.',
  'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop',
  4.7,
  '$10/month',
  'popular',
  1,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'future-ai-software-development'),
  'OpenAI',
  'ChatGPT Plus',
  'https://chat.openai.com',
  'Upgrade to ChatGPT Plus',
  'ref=blog-ai-guide',
  'ChatGPT Plus - Advanced AI Assistant',
  'Get faster responses, priority access, and access to GPT-4 for coding assistance.',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
  4.9,
  '$20/month',
  'editors-choice',
  2,
  true
ON CONFLICT DO NOTHING;

-- Post 3: Cloud Services
INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'cloud-architecture-best-practices-startups'),
  'AWS',
  'AWS Free Tier',
  'https://aws.amazon.com/free',
  'Start with AWS Free Tier',
  'ref=blog-cloud-guide',
  'AWS Free Tier - Start Building for Free',
  'Get started with AWS with 12 months free access to popular services. Perfect for startups.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  4.8,
  'Free tier available',
  'best-value',
  1,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'cloud-architecture-best-practices-startups'),
  'Google Cloud',
  'Google Cloud Platform',
  'https://cloud.google.com',
  'Try Google Cloud',
  'ref=blog-cloud-guide',
  'Google Cloud Platform - Scalable Infrastructure',
  'Build, deploy, and scale applications with Google''s infrastructure and AI capabilities.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  4.7,
  '$300 free credit',
  'popular',
  2,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'cloud-architecture-best-practices-startups'),
  'DigitalOcean',
  'DigitalOcean Droplets',
  'https://www.digitalocean.com',
  'Create a Droplet',
  'ref=blog-cloud-guide',
  'DigitalOcean - Simple Cloud Hosting',
  'Developer-friendly cloud platform with predictable pricing and excellent documentation.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  4.6,
  '$4/month',
  null,
  3,
  false
ON CONFLICT DO NOTHING;

-- Post 5: Supabase & Database Tools
INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-realtime-applications-supabase'),
  'Supabase',
  'Supabase Pro',
  'https://supabase.com/pricing',
  'Upgrade to Supabase Pro',
  'ref=blog-supabase-guide',
  'Supabase Pro - Open Source Firebase Alternative',
  'PostgreSQL database with real-time subscriptions, authentication, and storage built-in.',
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
  4.8,
  '$25/month',
  'editors-choice',
  1,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-realtime-applications-supabase'),
  'PlanetScale',
  'PlanetScale Database',
  'https://planetscale.com',
  'Try PlanetScale Free',
  'ref=blog-supabase-guide',
  'PlanetScale - Serverless MySQL Platform',
  'Scalable MySQL database with branching, non-blocking schema changes, and unlimited connections.',
  'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
  4.7,
  'Free - $29/month',
  'popular',
  2,
  false
ON CONFLICT DO NOTHING;

-- Post 7: React & Next.js Tools
INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'react-server-components-future-web-development'),
  'Vercel',
  'Vercel Pro',
  'https://vercel.com/pricing',
  'Upgrade to Vercel Pro',
  'ref=blog-react-guide',
  'Vercel Pro - Advanced Deployment Platform',
  'Advanced features for teams: preview deployments, team collaboration, and analytics.',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
  4.9,
  '$20/month',
  'editors-choice',
  1,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'react-server-components-future-web-development'),
  'Tailwind CSS',
  'Tailwind UI',
  'https://tailwindui.com',
  'Browse Tailwind UI',
  'ref=blog-react-guide',
  'Tailwind UI - Premium Component Library',
  'Beautiful, responsive components built with Tailwind CSS. Perfect for React and Next.js projects.',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
  4.8,
  '$249 one-time',
  'popular',
  2,
  false
ON CONFLICT DO NOTHING;

-- Post 8: Docker & DevOps
INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'dockerizing-nextjs-application'),
  'Docker',
  'Docker Desktop',
  'https://www.docker.com/products/docker-desktop',
  'Download Docker Desktop',
  'ref=blog-docker-guide',
  'Docker Desktop - Container Development Platform',
  'Build, share, and run containerized applications. Essential tool for modern development workflows.',
  'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop',
  4.7,
  'Free for personal use',
  'popular',
  1,
  true
ON CONFLICT DO NOTHING;

INSERT INTO affiliate_links (post_id, vendor, product, target_url, cta, tracking_code, title, description, image_url, rating, price, badge, position, featured)
SELECT 
  (SELECT id FROM posts WHERE slug = 'dockerizing-nextjs-application'),
  'Railway',
  'Railway Hosting',
  'https://railway.app',
  'Deploy on Railway',
  'ref=blog-docker-guide',
  'Railway - Deploy Docker Containers Easily',
  'Deploy your Docker containers with zero configuration. Automatic deployments from Git.',
  'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=300&fit=crop',
  4.6,
  '$5/month',
  'best-value',
  2,
  false
ON CONFLICT DO NOTHING;

-- ============================================================================
-- STEP 11: Optional - Add Media Assets (Example for one post)
-- ============================================================================

-- ============================================================================
-- STEP 11: Optional - Add Media Assets (Example for one post)
-- ============================================================================

INSERT INTO media_assets (post_id, type, url, alt)
SELECT 
  (SELECT id FROM posts WHERE slug = 'building-scalable-web-applications-nextjs-14'),
  'image',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
  'Code editor with Next.js project'
ON CONFLICT DO NOTHING;
-- ============================================================================
-- VERIFICATION QUERIES (Run these to verify the data)
-- ============================================================================

-- Check authors
-- SELECT * FROM authors;

-- Check categories with translations
-- SELECT c.slug, ct.locale, ct.name 
-- FROM categories c 
-- JOIN category_translations ct ON c.id = ct.category_id 
-- ORDER BY c.slug, ct.locale;

-- Check tags with translations
-- SELECT t.slug, tt.locale, tt.name 
-- FROM tags t 
-- JOIN tag_translations tt ON t.id = tt.tag_id 
-- ORDER BY t.slug, tt.locale;

-- Check blog posts with translations
-- SELECT bp.slug, bpt.locale, bpt.title, bp.published_at
-- FROM posts bp
-- JOIN post_translations bpt ON bp.id = bpt.post_id
-- ORDER BY bp.published_at DESC, bpt.locale;

-- Check post tags
-- SELECT bp.slug, t.slug as tag_slug
-- FROM posts bp
-- JOIN post_tags bpt ON bp.id = bpt.post_id
-- JOIN tags t ON bpt.tag_id = t.id
-- ORDER BY bp.slug, t.slug;

-- Check affiliate links
-- SELECT al.id, bp.slug, al.vendor, al.product, al.target_url
-- FROM affiliate_links al
-- JOIN posts bp ON al.post_id = bp.id
-- ORDER BY bp.slug, al.vendor;

-- ============================================================================
-- NOTE: Schema enhancements have been applied in STEP 1.5
-- ============================================================================
-- The affiliate_links table now includes all recommended fields:
-- - title, description, image_url, rating, price, badge, position, featured
-- All affiliate links in this seed file include these enhanced fields.

-- ============================================================================
-- END OF SEED SCRIPT
-- ============================================================================


