(()=>{
  class HighlightTool extends LiChessTools.Tools.ToolBase {

    dependencies=['EmitRedraw','DetectThirdParties'];

    preferences=[
      {
        name:'highlight',
        category: 'analysis',
        type:'multiple',
        possibleValues: ['lastMove','notCommented','transposition','mainLine'],
        defaultValue: 'lastMove,notCommented,transposition',
        advanced: true
      }
    ];

    intl={
      'en-US':{
        'options.highlight': 'Highlight moves in analysis',
        'highlight.lastMove': 'Last move in each variation',
        'highlight.notCommented': 'Not commented last moves',
        'highlight.transposition': 'Transpositions to current move',
        'highlight.mainLine': 'Highlight board when out of main line',
      },
      'ro-RO':{
        'options.highlight': 'Eviden\u0163iaz\u0103 mut\u0103ri \u00een analiz\u0103',
        'highlight.lastMove': 'Ultima mutare din fiecare varia\u0163iune',
        'highlight.notCommented': 'Ultime mut\u0103ri necomentate',
        'highlight.transposition': 'Transpozi\u0163iile la mutarea curent\u0103',
        'highlight.mainLine': 'Eviden\u0163iaz\u0103 tabla c\u00e2nd nu pe linia principal\u0103',
      }
    }

    highlightLastMoves=()=>{
      const parent=this.lichessTools;
      const $=parent.$;
      const toHighlight=[];
      if (this.options.lastMove) {
        for (const node of this.state.lastMoves) {
          const elem=parent.getElementForNode(node);
          if (!elem) continue;
          toHighlight.push(elem);
        }
      }
      $('div.analyse__moves move.lichessTools-lastInLine').filter((i,e)=>!toHighlight.includes(e)).removeClass('lichessTools-lastInLine');
      for (const elem of toHighlight) {
        $(elem).addClass('lichessTools-lastInLine');
      }
    };

    highlightUncommented=()=>{
      const parent=this.lichessTools;
      if (!parent.lichess?.analysis?.study) return;
      const $=parent.$;
      const toHighlight=[];
      if (this.options.notCommented) {
        for (const node of this.state.lastMoves) {
          if (node.isCommentedOrMate) continue;
          const elem=parent.getElementForNode(node);
          if (!elem) continue;
          toHighlight.push(elem);
        }
      }
      $('div.analyse__moves move.lichessTools-uncommented').filter((i,e)=>!toHighlight.includes(e)).removeClass('lichessTools-uncommented');
      for (const elem of toHighlight) {
        $(elem).addClass('lichessTools-uncommented');
      }
    };

    highlightTranspositions=()=>{
      const parent=this.lichessTools;
      const $=parent.$;
      const lichess=parent.lichess;
      const toHighlight=[];
      if (this.options.transposition) {
        const currentNode=lichess.analysis.node;
        if (currentNode.path===undefined) return;
        let transpositions=currentNode.transposition;
        if (parent.transpositionBehavior?.excludeSameLine) {
          transpositions=transpositions?.filter(n=>n===currentNode||(n.path&&!n.path.startsWith(currentNode.path)&&!currentNode.path.startsWith(n.path)));
        }  
        if (transpositions?.length>1) {
          for (const node of transpositions) {
            if (!node.path) continue;
            const elem=parent.getElementForNode(node);
            if (elem) {
              toHighlight.push(elem);
            }
          }
        }
      }
      $('div.analyse__moves move.lichessTools-transposition').filter((i,e)=>!toHighlight.includes(e)).removeClass('lichessTools-transposition');
      for (const elem of toHighlight) {
        $(elem).addClass('lichessTools-transposition');
      }
    };

    highlightMainLine=()=>{
      if (!this.options.mainLine) return;
      const parent=this.lichessTools;
      const analysis=parent.lichess.analysis;
      if (!analysis) return;
      const onMainline = analysis.mainline.includes(analysis.node);
      const $=parent.$;
      $('body').toggleClass('lichessTools-notOnMainline',!onMainline);
    };

    traverseTree=()=>{
      const parent=this.lichessTools;
      const lichess=parent.lichess;
      if (!lichess.analysis||!parent.isTreeviewVisible()) return;
      this.state=parent.traverse();
      this.highlightLastMoves();
      this.highlightUncommented();
      this.highlightTranspositions();
    };
    debouncedTraverseTree=this.lichessTools.debounce(this.traverseTree,800);
    async start() {
      const parent=this.lichessTools;
      const value=parent.currentOptions.getValue('highlight');
      this.logOption('Highlighting', value);
      const lichess=parent.lichess;
      if (!lichess) return;
      const $=parent.$;
      this.options={
        lastMove:parent.isOptionSet(value,'lastMove'),
        notCommented:parent.isOptionSet(value,'notCommented'),
        transposition:parent.isOptionSet(value,'transposition'),
        mainLine:parent.isOptionSet(value,'mainLine'),
        get isSet() { return this.lastMove || this.notCommented || this.transposition || this.mainLine; }
      };
      lichess.pubsub.off('redraw', this.highlightMainLine);
      lichess.pubsub.off('redraw', this.debouncedTraverseTree);
      if (this.options.isSet) {
        lichess.pubsub.on('redraw', this.highlightMainLine);
        lichess.pubsub.on('redraw', this.debouncedTraverseTree);
      }
      this.debouncedTraverseTree();
    }
  }
  LiChessTools.Tools.Highlight=HighlightTool;
})();
