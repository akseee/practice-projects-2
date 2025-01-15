// @ts-nocheck
export default class Component {
	#children = []
	#node = null

	constructor({ tag = 'div', className = '', text = '' }, ...children) {
		const node = document.createElement(tag)
		node.className = className
		node.textContent = text

		this.#node = node

		if (children) {
			this.appendChildren(children)
		}
	}

	append(child) {
		this.#children.push(child)
		this.#node.append(child.getNode())
	}

	appendChildren(children) {
		children.forEach((el) => {
			this.append(el)
		})
	}

	getNode() {
		return this.#node
	}

	getChildren() {
		return this.#children
	}

	querySelector(selector) {
		return this.#node.querySelector(selector)
	}

	setTextContent(content) {
		this.#node.textContent = content
	}

	setAttribute(attribute, value) {
		this.#node.setAttribute(attribute, value)
	}

	getAttribute(attribute) {
		return this.#node.getAttribute(attribute)
	}

	removeAttribute(attribute) {
		this.#node.removeAttribute(attribute)
	}

	toggleClass(className) {
		this.#node.classList.toggle(className)
	}

	setVisible(visible) {
		if (visible) {
			this.#node.classList.remove('visually-hidden')
		} else {
			this.#node.classList.add('visually-hidden')
		}
	}

	addClass(className) {
		this.#node.classList.add(className)
	}

	removeClass(className) {
		this.#node.classList.remove(className)
	}

	addListener(event, listener, options = false) {
		this.#node.addEventListener(event, listener, options)
	}

	removeListener(event, listener, options = false) {
		this.#node.removeEventListener(event, listener, options)
	}

	setDisabled(disabled) {
		this.#node.disabled = disabled
	}

	setLink(link) {
		this.#node.href = link
	}

	destroyChildren() {
		this.#children.forEach((child) => {
			child.destroy()
		})
		this.#children.length = 0
	}

	destroy() {
		this.destroyChildren()
		this.#node.remove()
	}
}
