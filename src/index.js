import {BrowserWindow} from 'electron'

import MainRouter from './main/Router'
import RendererRouter from './renderer/Router'

export default !BrowserWindow ? RendererRouter : MainRouter
