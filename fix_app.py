content = open('src/App.jsx').read()

# Add onBack to QuizScreen render
old = """{screen==='quiz' && gameQuestions.length>0 && <QuizScreen questions={gameQuestions} difficulty={difficulty} mode="category" theme={theme} sounds={sounds} onFinish={handleFinish} />}"""
new = """{screen==='quiz' && gameQuestions.length>0 && <QuizScreen questions={gameQuestions} difficulty={difficulty} mode="category" theme={theme} sounds={sounds} onFinish={handleFinish} onBack={()=>setScreen('category')} />}"""

content = content.replace(old, new, 1)
open('src/App.jsx', 'w').write(content)
print('Done')
