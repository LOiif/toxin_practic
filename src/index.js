import indexHTML from './index.html';
import formHTML from './form.html';
import './sass/styles.scss';
import {MiniFormComponent} from "./scripts/components/mini-form.component";
import {MainFormComponent} from "./scripts/components/main-form.component";
import {CatalogComponent} from "./scripts/components/catalog.component";

const miniFormComponent = new MiniFormComponent();
const mainFormComponent = new MainFormComponent();
const catalogComponent = new CatalogComponent();