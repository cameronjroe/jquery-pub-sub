(function($){

    /**
     * jquery-pub-sub
     */
    function SongRatingFactory() {

        var self = this;

        this.userTemplate = _.template($('#userTemplate').html());
        this.ratingsTemplate = _.template($('#ratingsTemplate').html());

        $.subscribe('/new/user', this.newUser.bind(this));

        $.subscribe('/new/rating', this.newRating.bind(this));

        // set up click handler
        $('#add').on('click', function (e) {

            e.preventDefault();

            var submitted = 0;
            // gather data
            var strUser = $('#twitter-handle').val(),
                strSong = $('#song-listened').val(),
                strRating = $('#song-rating').val();

            if (strUser !== '' && strSong !== '') {
                $.publish('/new/user', {name: strUser});

                $.publish('/new/rating', {title: strSong, rating: strRating});
                submitted++;
            }
            if (submitted > 0) {
                self._resetForm();
            }
        });
    }

    SongRatingFactory.prototype = {

        /**
         * Create a new user
         */
        newUser: function (e, data) {
            if (data) {
                $('#users').append( this.userTemplate(data) );
            }
        },

        /**
         * Create a new rating
         */
        newRating: function (e, data) {
            if (data) {
                $('#ratings').append( this.ratingsTemplate(data) );
            }
        },

        /**
         * Reset's the form
         */
        _resetForm: function () {
            $('#twitter-handle').val('');
            $('#song-listened').val('');
            $('#song-rating').val('5');
        }

    };

    new SongRatingFactory();

})(jQuery);