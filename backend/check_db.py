import os
import django
from django.db import connection

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nellfaa_backend.settings')
django.setup()

try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        print("✅ Connexion à la base de données réussie!")
        
        # Vérifier les tables
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        tables = [row[0] for row in cursor.fetchall()]
        print(f"\n📋 Tables trouvées: {len(tables)}")
        for table in tables:
            print(f"- {table}")
            
except Exception as e:
    print(f"❌ Erreur de connexion à la base de données: {e}")
    raise
