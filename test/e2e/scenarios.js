describe('Todo App', function(){
  
  describe('Todo App features', function(){

    var addItem = function(todo){
      var input = element(by.css('#header input'));
      input.clear();
      input.sendKeys(todo, protractor.Key.ENTER);
    };
    
    var todoCount = function(){
      return element(by.css('#todo-count strong')).getInnerHtml();
    };

    beforeEach(function() {
      browser.ignoreSynchronization = true;
      browser.get('index.html');
      browser.sleep(5000);
    });
    
    it('Should show a header and an input box to enter todo item', function(){
      expect(element(by.css('#header h1')).getText()).toBe('todos');
      expect(element(by.css('#header input')).isPresent()).toBeTruthy();
    });
    
    it('Should allow add todo item by entering input and press enter', function(){
      var input = element(by.css('#header input'));
      input.sendKeys('Finish todo app', protractor.Key.ENTER);
      element.all(by.css('#todo-list li')).then(function(todos){
        expect(todos.length).toBe(1);
        expect(todos[0].element(by.css('.view label')).getInnerHtml()).toContain('Finish todo app');
      });
      expect(todoCount()).toBe("1");
    });
    
    it('should allow change todo item complete status by toggle the checkbox on the left', function(){
      addItem('Shopping');
      element.all(by.css('#todo-list li')).then(function(todos){
        var check = todos[0].element(by.css('.view input'));
        check.click();
        expect(todoCount()).toBe("0");
        expect(element(by.css('#clear-completed')).isPresent()).toBeTruthy();
        check.click();
        expect(todoCount()).toBe("1");
        expect(element(by.css('#clear-completed')).isPresent()).toBeFalsy();
      });
    });
    
    it('should be able to delete todo item by clicking the clear button on the right', function(){
      addItem('Shopping');
      element.all(by.css('#todo-list li')).then(function(todos){
        var clearBtn = todos[0].element(by.css('.view .destroy'));
        browser.actions().mouseMove(todos[0].element(by.css('.view'))).perform();
        clearBtn.click();
        expect($('#todo-list').isPresent()).toBeFalsy();
      });      
    });
    
    it('should be able to toggle all todo items with the arrow button and clear completed items', function(){
      addItem('Finish todo app');
      addItem('Shopping');
      $('#toggle-all').click();
      expect(todoCount()).toBe("0");
      $('#clear-completed').click();
      expect($('#todo-list').isPresent()).toBeFalsy();
    });
    
  });
  
});