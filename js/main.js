(function($){

    /**
     * jquery-pub-sub
     */
    function SongRatingFactory() {

        this.userTemplate = _.template($('#userTemplate').html());
        this.ratingsTemplate = _.template($('#ratingsTemplate').html());

        $.subscribe('/new/user', this.newUser.bind(this));

        $.subscribe('/new/rating', this.newRating.bind(this));

        // set up click handler
        $('#add').on('click', function (e) {

            e.preventDefault();

            // gather data
            var strUser = $('#twitter-handle').val(),
                strSong = $('#song-listened').val(),
                strRating = $('#song-rating').val();

            if (strUser !== '') {
                $.publish('/new/user', {name: strUser});
            }
            if (strRating !== '') {
                $.publish('/new/rating', {title: strSong, rating: strRating});
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
                $('#twitter-handle').val('');
                $('#song-listened').val('');
                $('#song-rating').val('5');
            }
        },

        /**
         * Create a new rating
         */
        newRating: function (e, data) {
            if (data) {
                $('#ratings').append( this.ratingsTemplate(data) );
            }
        }

    };

    new SongRatingFactory();

})(jQuery);