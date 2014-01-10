
build: components index.js tabs.css
	@component-build --dev

components: component.json
	@component-install --dev

clean:
	rm -rf components build

.PHONY: clean
