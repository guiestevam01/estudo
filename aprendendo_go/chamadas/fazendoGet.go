package chamadas

import "net/http"

func GetStatus(url string) string {
	resp, err := http.Get(url)
	if err != nil {

	}
	return resp.Status

}
func GetHeader(url string) http.Header {
	resp, err := http.Get(url)
	if err != nil {

	}
	return resp.Header

}
