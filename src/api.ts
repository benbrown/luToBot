import { Templates } from 'botbuilder-lg';
import * as fs from 'fs';
import * as path from 'path';
import * as ncp from 'ncp';

export class luToBot {
  public intents: string[];
  public luContent: string;

  constructor(luFile?: string) {
      if (luFile) {
        this.luContent = fs.readFileSync(luFile, 'utf8');
        this.intents = this.getIntentsFromLu(this.luContent);
      }
  }

  public getIntentsFromLuFile(luFile: string): string[] {
    if (fs.existsSync(luFile)) {
      const luContent = fs.readFileSync(luFile,'utf8');
     return this.getIntentsFromLu(luContent);
    } else {
      throw new Error(`${ luFile } does not exist`)
    }
  }

  public getIntentsFromLu(luContent: string): string[] {
    const results = luContent.split(/\n/).filter((l) => { return l.match(/^#\s+/); }).map((intent) => intent.replace(/^#\s+/,'').trim());
    return results;
  }

  public generate(projectName: string): void {

    if (!fs.existsSync(projectName)) {
      const templates = Templates.parseFile('./templates/templates.lg');

      
      const dialog = templates.evaluate('dialog', {projectName: projectName, intents: this.intents, luContent: this.luContent});
      const commonlg = templates.evaluate('commonLgFile', {projectName: projectName, intents: this.intents, luContent: this.luContent});
      const lg = templates.evaluate('lgFile', {projectName: projectName, intents: this.intents, luContent: this.luContent});
      const lu = templates.evaluate('luFile', {projectName: projectName, intents: this.intents, luContent: this.luContent});

      fs.mkdirSync(projectName);
      fs.mkdirSync(path.join(projectName,'language-generation','en-us'), {recursive: true});
      fs.mkdirSync(path.join(projectName,'language-understanding','en-us'), {recursive: true});

      fs.writeFileSync(path.join(projectName,`${ projectName }.dialog`), dialog, 'utf8');
      fs.writeFileSync(path.join(projectName,'language-generation','en-us','common.en-us.lg'), commonlg, 'utf8');
      fs.writeFileSync(path.join(projectName,'language-generation','en-us',`${ projectName }.en-us.lg`), lg, 'utf8');
      fs.writeFileSync(path.join(projectName,'language-understanding','en-us',`${ projectName }.en-us.lu`), lu, 'utf8');
      ncp('templates/dialogs', path.join(projectName,'dialogs'), function(err) { 

      });
    } else {
      throw new Error(`${ projectName } already exists`)
    }
  }

}