
build: components index.js tabs.css
	@component-build --dev

components: component.json
	@component-install --dev

test:
	@component test phantom

test-browser:
	@component test browser

clean:
	rm -rf components build

.PHONY: clean test test-browser
