setup:
	npm install -g @google/clasp
deploy:
	npm run build && clasp push && clasp deploy