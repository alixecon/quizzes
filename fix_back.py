content = open('src/components/QuizScreen.jsx').read()
old = ">← back</button>"
new = ">← العودة</button>"
open('src/components/QuizScreen.jsx', 'w').write(content.replace(old, new, 1))
print('Done')
