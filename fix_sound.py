content = open('src/App.jsx').read()

old = """{screen==='quiz' && gameQuestions.length>0 && <QuizScreen questions={gameQuestions} difficulty={difficulty} mode="category" theme={theme} sounds={sounds} onFinish={handleFinish} onBack={()=>setScreen('category')} />}"""
new = """{screen==='quiz' && gameQuestions.length>0 && <QuizScreen questions={gameQuestions} difficulty={difficulty} mode="category" theme={theme} sounds={sounds} soundEnabled={soundEnabled} onSoundToggle={()=>setSoundEnabled(s=>!s)} onFinish={handleFinish} onBack={()=>setScreen('category')} />}"""

content = content.replace(old, new, 1)
open('src/App.jsx', 'w').write(content)
print('Done')
