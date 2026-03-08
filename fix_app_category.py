content = open('src/App.jsx').read()

old = "{screen==='category'   && <CategorySelect theme={theme} onSelect={handleCategory} onBack={handleHome} />}"
new = "{screen==='category'   && <CategorySelect theme={theme} sounds={sounds} onSelect={handleCategory} onBack={handleHome} />}"
content = content.replace(old, new, 1)

open('src/App.jsx','w').write(content)
print('Done')
