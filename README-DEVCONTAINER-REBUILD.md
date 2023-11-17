Any time the container gets rebuilt, you have to login to netlify again before you can use `netlify dev`.

`netlify login`

Control click on the link with the ticket number. Example: https://app.netlify.com/authorize?response_type=ticket&ticket=e786adfadfafaf

Now `netlify dev`` should work.

```txt
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?platform=linux&tool=cli

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/checking-for-existing-ssh-keys
Check for existing ssh keys.
`ls -al ~/.ssh`

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent

ssh-keygen -t ed25519 -C "your_email@example.com"

$ eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_ed25519

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

gh auth login

ssh

login on browser

gh ssh-key add ~/.ssh/id_ed25519.pub --title "as-z390-gatsby5-dev-container"
