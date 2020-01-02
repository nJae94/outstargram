export const COMMENT_FRAGMENT = `
    fragment CommentParts on Commnet{
         id
         text
         user {
             username
      }
    }
`;