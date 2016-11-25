
# BDINTESA

BIG DIVE INTESA SANPAOLO - Bucket

## GIT

Git è un software di controllo versione distribuito con l'obiettivo di semplificare la collaborazione / versioning / backup / distribuzione di software.

## GITHUB

GitHub è un servizio di hosting per progetti software basata su GIT. Viene utilizzato come contenitore / bucket per la distribuzione di progetti.

# Come utilizzare GIT

Ecco un elenco di informazioni utili e HOW TO su come clonare / sincronizzare / aggiornare la repository tramite GIT.

### GIT INSTALLAZIONE & SETUP

Su sistemi Linux per installare GIT è sufficiente utilizzare il package manager nativo del sistema, nel caso di UBUNTU è sufficiente:

    apt-get install git

Una volta installato si dovrà configurare il proprio account GITHUB sul pc locale, prima di tutto configurare la email tramite il comando ``git config``:

    git config —global user.email <INSERIRE_EMAIL_GITHUB>

E successivamente l'username:

    git config —global user.name <INSERIRE_USERNAME_GITHUB>

### GIT CLONE REPOSITORY

Grazie a GIT è possibile clonare in locale un qualsiasi repository presente su GITHUB tramite il comando ``git clone``:

    git clone https://github.com/NOME_ACCOUNT/NOME_REPOSITORY.git

### GIT SINCRONIZZAZIONE REPOSITORY LOCALE

Una volta clonata una repository, grazie a GIT, è facile mantenere allineato il codice salvato in locale con il codice presente su GITHUB tramite il comando ``git pull`` (tutti i comandi dovranno essere eseguiti dalla root del progetto):

    git pull

ATTENZIONE, nel caso in cui ci siano modifiche in locale non sarà possibile effettuare la sincronizzazione, sarà necessario creare un COMMIT (vedi dopo).

### GIT CREAZIONE COMMIT E PUSH SU GITHUB?

A fronte di modifiche locali su uno o più file sarà possibile creare delle subversion per sincronizzare la cartella remota. Per creare un ``COMMIT`` si dovranno seguire le seguenti operazioni:

Verifica dello stato della repository locale:

    git status # check status del progetto
    git diff   # verifica delle modifiche effettuate

Aggiunta di eventuali file nuovi alla repository:

    git add FILE_DA_AGGIUNGERE

Creazione del COMMIT (subversion):

    git commit -am "MESSAGGIO DA INSERIRE NEL COMMIT"

A questo punto sarà possibile effettuare un ``PUSH`` (upload) verso GITHUB:

      git push -u origin master

### GIT GESTIONE CONFLITTI DURANTE IL PUSH

Nel momento in cui si cercherà di effettuare un push sulla repository remota GIT effettuerà una serie di controlli, prima di tutto verificherà che la versione in locale sia aggiornata alla versione remota. Nel caso in cui questo non sia verificato, il push verrà annullato e sarà necessario effettuare una sincronizzazione locale prima di poter effettuare un ``PUSH`` sulla repository condivisa.

    git push
    [rejected] master -> master (non-fast forward)
    error: failed to push some refs to 'git@github.com:me/me.git'

    git pull
    # AUTOMATIC / MANUAL MERGE
    git push

### GIT DOCUMENTAZIONE

Per informazioni aggiuntive sono stati inseriti due datasheet su GIT all'interno della cartella ``development/02_GITHUB_HOWTO/``.
