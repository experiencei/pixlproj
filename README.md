## Pixl
To work on the Pixl project, open the `projects/pixl` directory in your IDE.
You can then execute `go run ./pixl` to run the project.

### Pixl Prerequisites
The Pixl project requires a working installation of `gcc`.


## Keiko
[k6](https://k6.io/) is used to benchmark the performance of the server for this project. To install `k6`, run `go install go.k6.io/k6@latest`.

After installation completes, you can run a benchmark with `k6 run bench.js`.

`Keiko` also uses `SQLite`, which requires `gcc`. If you can run `Pixl`, then you are good to Go :)
