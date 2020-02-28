const KEY = 'btns';
const PLUGIN_NAME = `@georgelovas/${KEY}`;
import { DisposableDelegate } from '@phosphor/disposable';
import { NotebookActions } from '@jupyterlab/notebook';
import { ToolbarButton } from '@jupyterlab/apputils';
/**
 * Notebook panel extension
 */
class OutputAutoScroll {
    createNew(panel, context) {
        // Callback of btnCellsUp
        let cbCellsUp = () => {
            return NotebookActions.moveUp(panel.content);
        };
        // Callback of btnCellsDown
        let cbCellsDown = () => {
            return NotebookActions.moveDown(panel.content);
        };
        // Callback of btnRunAll
        let cbRunAll = () => {
            NotebookActions.runAll(panel.content, context.session);
        };
        // Callback of btnRestartRunAll
        let cbRestartRunAll = () => {
            panel.session.restart().then((restarted) => {
                if (restarted)
                    NotebookActions.runAll(panel.content, context.session);
            });
        };
        // Create a toolbar button
        let btnCellsUp = new ToolbarButton({
            className: 'btnCellUp',
            iconClassName: '.gl-CellsUpIcon',
            onClick: cbCellsUp,
            tooltip: 'Move Cells Up'
        });
        // Create a toolbar button
        let btnCellsDown = new ToolbarButton({
            className: 'btnCellDown',
            iconClassName: '.gl-CellsDownIcon',
            onClick: cbCellsDown,
            tooltip: 'Move Cells Down'
        });
        // Create a toolbar button
        let btnRunAll = new ToolbarButton({
            className: 'btnRunAll',
            iconClassName: '.gl-RunAllIcon',
            onClick: cbRunAll,
            tooltip: 'Run All Cells'
        });
        // Create a toolbar button
        let btnRestartRunAll = new ToolbarButton({
            className: 'btnRunAll',
            iconClassName: '.gl-RestartRunAllIcon',
            onClick: cbRestartRunAll,
            tooltip: 'Restart Kernel and Run All Cells'
        });
        // Insert Move Up
        panel.toolbar.insertAfter('cut', 'btnCellsUp', btnCellsUp);
        // Insert Move Down
        panel.toolbar.insertBefore('copy', 'btnCellsDown', btnCellsDown);
        // Insert after run
        panel.toolbar.insertAfter('run', 'btnRunAll', btnRunAll);
        // Insert after restart
        panel.toolbar.insertAfter('restart', 'btnRestartRunAll', btnRestartRunAll);
        // Return a delegate which can dispose our created button
        return new DisposableDelegate(() => {
            btnCellsUp.dispose();
            btnCellsDown.dispose();
            btnRunAll.dispose();
            btnRestartRunAll.dispose();
        });
    }
}
/**
 * Initialization data for the @georgelovas/btns extension.
 */
const extension = {
    id: PLUGIN_NAME,
    autoStart: true,
    activate: (app) => {
        console.log(`JupyterLab extension ${PLUGIN_NAME} is activated!`);
        // Register our extension
        app.docRegistry.addWidgetExtension('notebook', new OutputAutoScroll);
    }
};
export default extension;
