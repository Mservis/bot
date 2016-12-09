(function(app){

    app.core.define('#searchbar', function(f){

        var  that, input, button, sg_instance;

        return {
            init: function(){
                that = this;

                var select = SG.opts.select;

                sg_instance = SG({
                    select: function(){
                        select.apply(sg_instance, arguments);
                        f.sendStats("search_suggest");
                    }
                });

                sg_instance.enable();

                button = f.find('.searchbar__button')[0];
                input = f.find('.searchbar__line')[0];

                f.bind(button, 'click', this.handleEntry);
                f.bind(input, 'keydown', this.handleKey);

            },
            destroy: function(){
                f.unbind(button, "click", this.handleEntry);
                f.unbind(input, "keydown", this.handleKey);

                that = input = button = sg_instance = null;
            },
            handleEntry: function(e){
                var isButtonSource = e.screenX && e.screenY;

                if (that.isInputEmpty()) return false;

                if (isButtonSource) f.sendStats("search_button_click");
            },
            handleKey: function(event){
                var sgState = sg_instance.getState();

                if(event.keyCode == 13 && sgState && sgState.focused == -1){
                    if (that.isInputEmpty()) return false;

                    f.sendStats("search_enter_press");
                }
            },
            isInputEmpty: function(){
                return f.trim(input.value) == '';
            }
        }

    });

})(app);
