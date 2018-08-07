import sqlite3
import sys

if len(sys.argv) != 3:
	print('USAGE: python3 {} DB_NAME TABLE_NAME'.format(sys.argv[0]))
	sys.exit()

db_name = str(sys.argv[1] + '.db')
table_name = str(sys.argv[2])

query = '''
CREATE TABLE IF NOT EXISTS {table} 
(username TEXT PRIMARY KEY,
password TEXT)
;
'''.format(table=table_name)

with sqlite3.connect(db_name) as conn:
	c = conn.cursor()
	c.execute(query)
	