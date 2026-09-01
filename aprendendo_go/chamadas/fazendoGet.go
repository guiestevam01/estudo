package chamadas

import "net/http"

func GetStatus(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {

	}
	return resp.Status, nil

}
func GetHeader(url string) (http.Header, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	return resp.Header, nil

}
