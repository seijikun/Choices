import { PassedElement, ClassNames } from '../interfaces';

export default class Dropdown {
  element: HTMLElement;
  type: PassedElement['type'];
  classNames: ClassNames;
  isActive: boolean;

  constructor({
    element,
    type,
    classNames,
  }: {
    element: HTMLElement;
    type: PassedElement['type'];
    classNames: ClassNames;
  }) {
    this.element = element;
    this.classNames = classNames;
    this.type = type;
    this.isActive = false;
  }

  /**
   * Bottom position of dropdown in viewport coordinates
   */
  get distanceFromTopWindow(): number {
    return this.element.getBoundingClientRect().bottom;
  }

  getChild(selector: string): HTMLElement | null {
    return this.element.querySelector(selector);
  }

  /**
   * Show dropdown to user by adding active state class
   */
  show(): this {
    this.element.classList.add(this.classNames.activeState);
    this.element.setAttribute('aria-expanded', 'true');
    this.isActive = true;
    let parentElement = this.element.parentElement;
    if(parentElement) {
      let parentRect = parentElement.getBoundingClientRect();
      this.element.style.width = parentRect.width + 'px';
      this.element.style.top = (parentRect.y + parentRect.height) + 'px';
      this.element.style.left = parentRect.x + 'px';
    }

    return this;
  }

  /**
   * Hide dropdown from user
   */
  hide(): this {
    this.element.classList.remove(this.classNames.activeState);
    this.element.setAttribute('aria-expanded', 'false');
    this.isActive = false;

    return this;
  }
}
