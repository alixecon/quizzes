content = open('src/App.jsx').read()
old = """const handleDifficulty = (d) => {
    sounds.click(); setDifficulty(d)
    let pool = getQuestions(selectedCategory, d)
    if (categoryId) pool = pool.filter(q=>q.category===categoryId)
    if (!pool.length) pool = questions.filter(q=>q.difficulty===d)
    if (!pool.length) pool = questions"""
new = """const handleDifficulty = (d) => {
    sounds.click(); setDifficulty(d)
    let pool = getQuestions(categoryId, d)
    if (!pool.length) pool = getQuestions(null, d)
    if (!pool.length) pool = getQuestions(null, null)"""
result = content.replace(old, new, 1)
open('src/App.jsx', 'w').write(result)
print('Done' if old not in result else 'MATCH NOT FOUND')
